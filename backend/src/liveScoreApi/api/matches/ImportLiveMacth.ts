import axios                                from "axios";
import { Command }                          from 'commander';
import moment                               from "moment";

import BaseApi                              from "../BaseApi";
import { GenericApiResponse }               from "../../interface/API/GlobalInterface";
import * as MatchApiResponse                from "../../interface/API/MatchInterface";
import { FeedType as FeedTypeMongo }        from "../../../database/mongodb/models/Feed";
import * as MatchMongo                      from "../../../database/mongodb/models/Match";
import * as CompetitionMongo                from "../../../database/mongodb/models/Competition";
import * as TeamMongo                       from "../../../database/mongodb/models/Team";
import FrontendCreateResponse               from "../../../models/FrontendCreateResponse";
import SocketToClient                       from "../../../services/SocketToClient";

class ImportLiveMacth extends BaseApi {    
    private frontendCreateResponse:FrontendCreateResponse; 
    private socketToClient:SocketToClient;

    constructor() {
        super();          
        this.frontendCreateResponse = new FrontendCreateResponse();
        this.socketToClient         = new SocketToClient(3001);
        this.socketToClient.connectClientSocket();
        
        const that = this;
        that.importAll();
        setInterval(() => {
            that.importAll();
        }, 1000);                
    }

    private async importAll():Promise<void> {
        this.frontendCreateResponse = new FrontendCreateResponse();
        const feed:Promise<FeedTypeMongo|null|undefined> = this.getFeedByName('live');
        feed.then( (feed) => {
            if (this.isValidDataType(feed)) {
                this.fetchData(feed);                                 
            }                 
        })        
    }

    private async fetchData(feed: FeedTypeMongo): Promise<void> {
        try {
            let tomorrow   = moment().add(1, 'days');
            const endPoint = `${feed.endPoint}?date=${tomorrow.format('YYYY-MM-DD')}&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`;        
            const response = await axios.get(endPoint);
            const apiResponse: GenericApiResponse<MatchApiResponse.Match> = response.data;       
            await this.eachFixture(apiResponse).then((result) => {         
                //console.log(JSON.stringify(this.frontendCreateResponse.objResponse));       
                this.socketToClient.sendDataLive(JSON.stringify(this.frontendCreateResponse.objResponse));
            })
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }             
    }

    private async eachFixture(apiResponse: GenericApiResponse<MatchApiResponse.Match>) {        
        const promises = apiResponse.data['match'].map(async (item) => {
          return this.setLiveMatch(item);
        });      
        await Promise.all(promises);
    }

    private async setLiveMatch(match: MatchApiResponse.Match) {
        const homeTeam:     TeamMongo.TeamWithIdType | null | undefined                = await this.getTeamByFilter({externalId:match.home_id});
        const awayTeam:     TeamMongo.TeamWithIdType | null | undefined                = await this.getTeamByFilter({externalId:match.away_id});
        const competition:  CompetitionMongo.CompetitionWithIdType | null | undefined  = await this.getOneCompetitionByFilter({externalId:match.competition_id});

        if( !this.isValidDataType(homeTeam) ) {
            console.log('Skip match not valid homeTeam:', match);   
            return null;
        }
        if(!this.isValidDataType(awayTeam)) {
            console.log('Skip match not valid awayTeam:', match);   
            return null;
        }
        if(!this.isValidDataType(competition) ) {
            console.log('Skip match not valid competition:', match);   
            return null;
        }

        const dateMatch = moment().format('YYYY-MM-DD')+' '+match.scheduled;
        const dataMatch:MatchMongo.MatchType = {
            competitionId:      competition._id,
            teamHome:           homeTeam._id,
            teamAway:           awayTeam._id,
            fixtureId:          Number(match.fixture_id),
            timeMatch:          match.time,
            dateMatch:          dateMatch,
            extMatchId:         match.id,
            score:              match.score,
            lastGoal:           '',
            status:             match.status,
            halfTimeScore:      match.ht_score,
            fullTimeScore:      match.ft_score,
            extraTimeScore:     match.et_score,
            penaltyTimeScore:   match.ps_score,
            lastChanged:        new Date(match.last_changed)
        }  

        const resultMatch:MatchMongo.MatchWithIdType|boolean = await this.getMatch(Number(match.fixture_id));
        if (typeof resultMatch === 'object') {                         
            const differences = findDiff(dataMatch, resultMatch);            
            
            if( JSON.stringify(differences) !== '{}' ) {         
                console.log(differences);       
                if( differences.lastGoal != '' ) {
                    dataMatch.lastGoal = differences.lastGoal;
                }
                this.frontendCreateResponse.addLiveMatch(differences, resultMatch._id);
                MatchMongo.Match.updateOne({ extMatchId: match.id }, dataMatch )
                .then(result => {
                    
                })
                .catch(err => {
                    console.error(err);
                });
            }            
            //console.log('update: '+match.id);
        } else {
            console.log('insert');
            const newMatch = new MatchMongo.Match(dataMatch);
            newMatch.save().then(doc => {
                //console.log('Document inserted:');    
            }).catch(err => {
                console.error('Error inserting document:', err);            
            });
        }        
    }

    private async getMatch(fixtureId:number): Promise<MatchMongo.MatchWithIdType|boolean> {
        try {
            const filter:object = {fixtureId:fixtureId};
            const match:MatchMongo.MatchWithIdType|null = await MatchMongo.Match.findOne(filter).populate('competitionId').populate('teamHome').populate('teamAway').exec()
            if( this.isValidDataType(match)) {
                return match;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Errore durante la ricerca del match:', error);
        }
        return false;
    }
}

function findDiff(apiDataMatch: Record<string, any>, mongoMatch: Record<string, any>): Record<string, any> {
    const diff: Record<string, any> = {};
    let key: string;
    let competitionId: string = '';  // Initialize competitionId with a default value
  
    for (key in apiDataMatch) {      
        if (key == 'competitionId') {
            competitionId = apiDataMatch[key];
        }  
        if (JSON.stringify(apiDataMatch[key]) !== JSON.stringify(mongoMatch[key])) {
            if (key != 'teamHome' && key != 'teamAway' && key != 'dateMatch' && key != 'competitionId' && key != 'lastChanged' && key != 'lastGoal') {
                diff[key] = apiDataMatch[key];            
            }    
        }
    }  
    
    if (JSON.stringify(diff) !== '{}' && competitionId != '') {
        diff['competitionId'] = competitionId;
    }

    

    const scoreMondoSplit   = mongoMatch.score.replace(/\s/g, '');
    const scoreApiSplit     = apiDataMatch.score.replace(/\s/g, '');    
    const [homeTeamScoreMongo, awayTeamScoreMongo]  = scoreMondoSplit.split('-');
    const [homeTeamScoreApi, awayTeamScoreApi]      = scoreApiSplit.split('-');

    diff['newGoal'] = false;
    if( scoreMondoSplit != scoreApiSplit && homeTeamScoreApi !== '?' && awayTeamScoreApi != '?'  ) {    

        if (homeTeamScoreMongo !== homeTeamScoreApi) {
            diff['lastGoal'] = 'home';
        }

        console.log(awayTeamScoreMongo+'!=='+awayTeamScoreApi);
        if (awayTeamScoreMongo !== awayTeamScoreApi) {
            diff['lastGoal'] = 'away';
        }

        diff['newGoal'] = true;
    }
    return diff;
}

const program = new Command();
program.version('1.0.0').description('CLI team commander')     
    .action((options) => {    
        new ImportLiveMacth(); 
    });
program.parse(process.argv);