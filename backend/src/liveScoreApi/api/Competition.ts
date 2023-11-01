import axios                                from "axios";
import { Command }                          from 'commander';

import {  ObjectId } from 'mongoose';

import { Feed as FeedMongo, 
    FeedType as FeedTypeMongo }             from "../../database/mongodb/models/Feed";

import { GenericApiResponse }               from "../interface/API/GlobalInterface";
import * as CompetitionMongo                    from "../../database/mongodb/models/Competition";
import * as CountryMongo                    from "../../database/mongodb/models/Country";

import * as CompetitionApiInterface                from "../interface/API/CompetitionInterface";

import BaseAPiConverter                     from "./BaseConverter";

class CompetitionProcessor extends BaseAPiConverter  {
    constructor(action:string) {
        super();
                
        switch( action ) {
            case 'importAllCompetition':
                this.importAllCompetition();
            break;
        }
    }

    private importAllCompetition() :void {
        const feed:Promise<FeedTypeMongo|null|undefined> = this.retrieveAndProcessFeed();
        feed.then( (feed) => {
            if (this.isFeedType(feed)) {
                const countries:Promise<CountryMongo.CountryArrayWithIdType|null|undefined> = this.retrieveAndProcessCountries();
                countries.then( (country) => {
                    if (this.isCountryArrayWithIdType(country)) {
                        this.getCompetitionApi(country, feed);
                    }
                })
            }
        })        
    }

    //Recupera l'endPoint per la chiamata al servizio esterpi api livescore dei team
    private async retrieveAndProcessFeed(): Promise<FeedTypeMongo|null|undefined> {
        try {
            const feed:FeedTypeMongo|null = await FeedMongo.findOne({ name: 'competitions' }).exec()
            return feed;             
        } catch (error) {
            console.error('Errore durante la ricerca del feed:', error);
        }
    }

    //Recupera tutti i contries su MongoDB
    private async retrieveAndProcessCountries(): Promise<CountryMongo.CountryArrayWithIdType|null|undefined> {
        try {
            const countries:CountryMongo.CountryArrayWithIdType|null = await CountryMongo.Country.find({}).exec()
            return countries;             
        } catch (error) {
            console.error('Errore durante la ricerca del country:', error);
        }
    }

    //Verifica se è del tipo corretto aspettato
    private isFeedType(feed: FeedTypeMongo|null|undefined): feed is FeedTypeMongo {
        return feed !== null;
    }

    //Verifica se è del tipo corretto aspettato
    private isCountryArrayWithIdType(countries: CountryMongo.CountryArrayWithIdType|null|undefined): countries is CountryMongo.CountryArrayWithIdType {
        return countries !== null && countries !== undefined;
    }

    //
    private async getCompetitionApi(countries: CountryMongo.CountryArrayWithIdType, feed: FeedTypeMongo): Promise<void> {
        try {
            this.fetchCountriesData(countries, feed);
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }             
    }

    //Per ogni paese chiama la funzione per recuperare i suoi team
    private async fetchCountriesData(countries: CountryMongo.CountryArrayWithIdType, feed: FeedTypeMongo): Promise<void> {
        for (let country of countries) {     
            const endPoint:string   = `${feed.endPoint}?country_id=${country.externalId}&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`;       
            console.log(endPoint);
            const response          = await axios.get(endPoint);
            const apiResponse: GenericApiResponse<CompetitionApiInterface.Competition> = response.data;       
            this.insertCompetition(apiResponse,country._id);
        }        
    }

    //Inserisce su mongo i team di un paese
    private insertCompetition(apiResponse:GenericApiResponse<CompetitionApiInterface.Competition>, countryId:ObjectId ) {
        if (apiResponse.success ) {
            const transform = (competition: CompetitionApiInterface.Competition): CompetitionMongo.CompetitionType => ({
                externalId:         Number(competition.id),
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