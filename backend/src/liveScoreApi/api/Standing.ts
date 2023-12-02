import axios from "axios";
import { Command } from 'commander';
import { ObjectId } from 'mongoose';

import { FeedType as FeedTypeMongo } from "../../database/mongodb/models/Feed";
import { GenericApiResponse } from "../interface/API/GlobalInterface";
import * as CompetitionMongo from "../../database/mongodb/models/Competition";
import * as StandingMongo from "../../database/mongodb/models/Standing";
import * as StandingApiInterface from "../interface/API/StandingInterface";
import BaseApi from "./BaseApi";
import StringUtility from "../../services/StringUtility";   

class StandingProcessor extends BaseApi  {
    constructor(action:string) {
        super();
                
        switch( action ) {
            case 'importAllStandings':
                this.importAllStandings();
            break;
        }
    }

    private importAllStandings() :void {
        const feed:Promise<FeedTypeMongo|null|undefined> = this.getFeedByName('standings');
        feed.then( (feed) => {
            if (this.isValidDataType(feed)) {
                const competitions:Promise<CompetitionMongo.CompetitionArrayWithIdType|null|undefined> = this.retrieveAndProcessCompetitions();
                competitions.then( (competition) => {
                    if (this.isValidDataType(competition)) {
                        this.fetchCompetitionsData(competition, feed);
                    }
                })
            }
        })        
    }

    private async fetchCompetitionsData(competitions: CompetitionMongo.CompetitionArrayWithIdType, feed: FeedTypeMongo): Promise<void> {
        try {
            for (let competition of competitions) {
                
                await this.getStandingPage(`${feed.endPoint}?competition_id=${competition.externalId}&season_id=${competition.season.id}&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`, competition);
                //await this.getStandingPage(`https://livescore-api.com/api-client/competitions/standings.json?competition_id=2&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX&competition_id=244`, competition);
            }        
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }             
    }

    private async getStandingPage(endPoint:string, competition:CompetitionMongo.CompetitionWithIdType) {
        console.log(endPoint);
        const response = await axios.get(endPoint);
        const apiResponse: GenericApiResponse<StandingApiInterface.Standing> = response.data;       
        this.insertStanding(apiResponse, competition._id);

        // if( response.data.data.next_page != false ) {
        //     const endPoint = response.data.data.next_page;
        //     await this.getStandingPage(endPoint, competition);            
        // }                
    }

    private insertStanding(apiResponse:GenericApiResponse<StandingApiInterface.Standing>, competitionId:ObjectId ) {
        if (apiResponse.success ) {
            const transform = (standing: StandingApiInterface.Standing): StandingMongo.StandingType => ({
                competitionId:  parseInt(standing.competition_id),
                drawn:          parseInt(standing.drawn),
                form:           standing.form != undefined ? standing.form.map(f => f as 'W' | 'L' | 'D') : [''],
                goalDiff:       parseInt(standing.goal_diff),
                goalsConceded:  parseInt(standing.goals_conceded),
                goalsScored:    parseInt(standing.goals_scored),
                groupId:        parseInt(standing.group_id),
                groupName:      standing.group_name,
                lost:           parseInt(standing.lost),
                matches:        parseInt(standing.matches),
                name:           standing.name,
                points:         parseInt(standing.points),
                rank:           parseInt(standing.rank),
                seasonId:       parseInt(standing.season_id),
                stageId:        parseInt(standing.stage_id),
                stageName:      standing.stage_name,
                teamId:         parseInt(standing.team_id),
                won:            parseInt(standing.won)
            });                                    
            const resultArray = this.transformAPIResponseToArray(apiResponse, 'table', transform);      

            StandingMongo.Standing.insertMany(resultArray)
            .then((docs) => {
                console.log('Standings inserted successfully');
            })
            .catch((err) => {
                console.error('Error inserting standings:', err);
            });
        }
    }

}

const program = new Command();
program.version('1.0.0').description('CLI standing commander') 
    .option('-a, --action <type>', 'Azione da lanciare')
    .action((options) => {    
        new StandingProcessor(options.action);
    });
program.parse(process.argv);