import axios                                from "axios";
import { Command }                          from 'commander';
import {  ObjectId }                        from 'mongoose';
import moment                               from "moment";

import { FeedType as FeedTypeMongo }        from "../../../database/mongodb/models/Feed";
import { GenericApiResponse }               from "../../interface/API/GlobalInterface";
import * as MatchMongo                      from "../../../database/mongodb/models/Match";
import * as CompetitionMongo                from "../../../database/mongodb/models/Competition";
import * as TeamMongo                       from "../../../database/mongodb/models/Team";
import * as FixtureApiResponse              from "../../interface/API/FixtureInterface";
import BaseApi                              from "../BaseApi";

class ImportFixtureMatch extends BaseApi  {
    constructor(action:string) {
        super();  
        this.importAll();       
    }

    private importAll() :void {
        const feed:Promise<FeedTypeMongo|null|undefined> = this.getFeedByName('matches');
        feed.then( (feed) => {
            if (this.isValidDataType(feed)) {
                const competitions:Promise<CompetitionMongo.CompetitionArrayWithIdType|null|undefined> = this.retrieveAndProcessCompetitions();
                competitions.then((competition) => {
                    if (this.isValidDataType(competition)) {
                        this.fetchData(competition, feed);
                    }
                })
            }
        })        
    }

    private async fetchData(competitions: CompetitionMongo.CompetitionArrayWithIdType, feed: FeedTypeMongo): Promise<void> {
        try {
            for (let competition of competitions) {
                let tomorrow = moment().add(0, 'days');
                await this.getPage(`${feed.endPoint}?date=${tomorrow.format('YYYY-MM-DD')}&competition_id=${competition.externalId}&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`, competition);
            }        
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }             
    }

    private async getPage(endPoint:string, competition:CompetitionMongo.CompetitionWithIdType) {
        console.log(endPoint);
        const response = await axios.get(endPoint);
        const apiResponse: GenericApiResponse<FixtureApiResponse.Fixture> = response.data;       
        this.eachFixture(apiResponse,competition._id);

        if( response.data.data.next_page != false ) {
            const endPoint = response.data.data.next_page;
            await this.getPage(endPoint, competition);            
        }                
    }

    private eachFixture(apiResponse:GenericApiResponse<FixtureApiResponse.Fixture>, competition:ObjectId ) {
        apiResponse.data['fixtures'].map(item => 
            this.insertFixture(item,competition)
        );                    
    }

    private async insertFixture(fixture: FixtureApiResponse.Fixture,competition: ObjectId) {
        const homeTeam:TeamMongo.TeamWithIdType | null | undefined = await this.getTeamByFilter({externalId:fixture.home_id});
        const awayTeam:TeamMongo.TeamWithIdType | null | undefined = await this.getTeamByFilter({externalId:fixture.away_id});
        if( !this.isValidDataType(homeTeam) || !this.isValidDataType(awayTeam) ) {
            console.log('Skip match:', fixture);   
            return null;
        }

        const dataMatch:MatchMongo.MatchType = {
            competitionId:      competition,
            teamHome:           homeTeam._id,
            teamAway:           awayTeam._id,
            fixtureId:          Number(fixture.id),
            timeMatch:          fixture.time,
            dateMatch:          fixture.date,
            extMatchId:         fixture.id,
            lastGoal:           'away',
            score:              '0-0',
            status:             '',
            halfTimeScore:      '0-0',
            fullTimeScore:      '0-0',
            extraTimeScore:     '0-0',
            penaltyTimeScore:   '0-0',
            lastChanged:        new Date(fixture.date),
        }           

        const newMatch = new MatchMongo.Match(dataMatch);
        newMatch.save().then(doc => {
           console.log('Document inserted:', doc);    
        }).catch(err => {
            console.error('Error inserting document:', err);            
        });
    }
}

const program = new Command();
program.version('1.0.0').description('CLI team commander')     
    .action((options) => {    
        new ImportFixtureMatch(options.action);
    });
program.parse(process.argv);