import axios                                from "axios";
import { Command }                          from 'commander';
import moment                               from "moment";

import { FeedType as FeedTypeMongo }        from "../../../database/mongodb/models/Feed";
import { GenericApiResponse }               from "../../interface/API/GlobalInterface";
import * as MatchMongo                      from "../../../database/mongodb/models/Match";
import * as CompetitionMongo                from "../../../database/mongodb/models/Competition";
import * as TeamMongo                       from "../../../database/mongodb/models/Team";
import * as MatchApiResponse                from "../../interface/API/MatchInterface";
import SocketCreateResponse                 from "../../../socket/interface/SocketCreateResponse";
import BaseApi                              from "../BaseApi";

class ImportLiveMacth extends BaseApi {    
    private socketCreateResponse:SocketCreateResponse; 

    constructor() {
        super();          
        this.socketCreateResponse = new SocketCreateResponse();
        this.importAll();            
              
    }

    private async importAll() :Promise<void> {
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
                // Assuming eachFixture resolves with a result that you want to log
                console.log(JSON.stringify(this.socketCreateResponse.objResponse));
            })
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }             
    }

    private async eachFixture(apiResponse: GenericApiResponse<MatchApiResponse.Match>) {
        // Map each item to a promise using the async setLiveMatch function
        const promises = apiResponse.data['match'].map(async (item) => {
          return this.setLiveMatch(item);
        });
      
        // Wait for all the setLiveMatch promises to resolve
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
            status:             match.status,
            halfTimeScore:      match.ht_score,
            fullTimeScore:      match.ft_score,
            extraTimeScore:     match.et_score,
            penaltyTimeScore:   match.ps_score,
            lastChanged:        new Date(match.last_changed)
        }  

        const resultMatch:MatchMongo.MatchWithIdType|boolean = await this.getMatch(match.id);
        if (typeof resultMatch === 'object') {                         
            const differences = findDiff(dataMatch, resultMatch);
            const differencesJson = JSON.stringify(differences, null, 2);

            // if( match.id == 474158 ) {
                this.socketCreateResponse.addLiveMatch(resultMatch);
            // }

            MatchMongo.Match.updateOne({ extMatchId: match.id }, dataMatch )
            .then(result => {
                
            })
            .catch(err => {
                console.error(err);
            });
            console.log('update: '+match.id);
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

    private async getMatch(matchId:number): Promise<MatchMongo.MatchWithIdType|boolean> {
        try {
            const filter:object = {extMatchId:matchId};
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

function findDiff(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
    const diff: Record<string, any> = {};
    let key: string;
  
    for (key in obj1) {      
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        diff[key] = obj2[key] ;
      }
    }  
    return diff;
}

const program = new Command();
program.version('1.0.0').description('CLI team commander')     
    .action((options) => {    
        new ImportLiveMacth(); 
    });
program.parse(process.argv);