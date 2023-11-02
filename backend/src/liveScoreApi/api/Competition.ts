import axios                                from "axios";
import { Command }                          from 'commander';
import {  ObjectId }                        from 'mongoose';

import { Feed as FeedMongo, 
    FeedType as FeedTypeMongo }             from "../../database/mongodb/models/Feed";
import { GenericApiResponse }               from "../interface/API/GlobalInterface";
import * as CompetitionMongo                from "../../database/mongodb/models/Competition";
import * as CountryMongo                    from "../../database/mongodb/models/Country";
import * as CompetitionApiInterface         from "../interface/API/CompetitionInterface";
import BaseApi                              from "./BaseApi";

class CompetitionProcessor extends BaseApi  {
    constructor(action:string) {
        super();
                
        switch( action ) {
            case 'importAllCompetition':
                this.importAllCompetition();
            break;
        }
    }

    private importAllCompetition() :void {
        const feed:Promise<FeedTypeMongo|null|undefined> = this.getFeedByName('competitions');
        feed.then( (feed) => {
            if (this.isValidDataType(feed)) {
                const countries:Promise<CountryMongo.CountryArrayWithIdType|null|undefined> = this.retrieveAndProcessCountries();
                countries.then( (country) => {
                    if (this.isValidDataType(country)) {
                        this.fetchCountriesData(country, feed);
                    }
                })
            }
        })        
    }        

    //Per ogni paese chiama la funzione per recuperare i suoi team
    private async fetchCountriesData(countries: CountryMongo.CountryArrayWithIdType, feed: FeedTypeMongo): Promise<void> {
        try {        
            for (let country of countries) {     
                const endPoint:string   = `${feed.endPoint}?country_id=${country.externalId}&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`;       
                console.log(endPoint);
                const response          = await axios.get(endPoint);
                const apiResponse: GenericApiResponse<CompetitionApiInterface.Competition> = response.data;       
                this.insertCompetition(apiResponse,country._id);
            }    
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }        
    }

    //Inserisce su mongo i team di un paese
    private insertCompetition(apiResponse:GenericApiResponse<CompetitionApiInterface.Competition>, countryId:ObjectId ) {
        if (apiResponse.success ) {
            const transform = (competition: CompetitionApiInterface.Competition): CompetitionMongo.CompetitionType => ({
                externalId:         Number(competition.id),
                countryId:          countryId,
                name:               competition.name,                
                active:             Number(competition.active),
                hasGroups:          Number(competition.has_groups),
                isLeague:           Number(competition.is_league),
                isCup:              Number(competition.is_cup),
                nationalTeamsOnly:  Number(competition.national_teams_only),
                season: {
                    id:         Number(competition.season.id),
                    name:       competition.season.name,
                    start:      competition.season.start,      
                    end:        competition.season.end
                }
            });
                            
            const resultArray = this.transformAPIResponseToArray(apiResponse, 'competition', transform);      

            CompetitionMongo.Competition.insertMany(resultArray)
            .then((docs) => {
                console.log('Feeds inserted successfully');
            })
            .catch((err) => {
                console.error('Error inserting feeds:', err);
            });
        }
    }
}

const program = new Command();
program.version('1.0.0').description('CLI team commander') 
    .option('-a, --action <type>', 'Azione da lanciare')
    .action((options) => {    
        new CompetitionProcessor(options.action);
    });
program.parse(process.argv);