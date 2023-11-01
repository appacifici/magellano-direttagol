import axios                                from "axios";
import { Command }                          from 'commander';

import {  ObjectId } from 'mongoose';

import { Feed as FeedMongo, 
    FeedType as FeedTypeMongo }             from "../../database/mongodb/models/Feed";

import { GenericApiResponse }               from "../interface/API/GlobalInterface";
import * as CountryMongo                    from "../../database/mongodb/models/Country";

import * as TeamMongo                       from "../../database/mongodb/models/Team";
import * as TeamApiInterface                from "../interface/API/TeamInterface";

import BaseAPiConverter                     from "./BaseConverter";

class FeedProcessor extends BaseAPiConverter  {
    constructor(action:string) {
        super();
                
        switch( action ) {
            case 'importAllTeam':
                this.importAllTeam();
            break;
        }
    }

    private importAllTeam() :void {
        const feed:Promise<FeedTypeMongo|null|undefined> = this.retrieveAndProcessFeed();
        feed.then( (feed) => {
            if (this.isFeedType(feed)) {
                const countries:Promise<CountryMongo.CountryArrayWithIdType|null|undefined> = this.retrieveAndProcessCountries();
                countries.then( (country) => {
                    if (this.isCountryArrayWithIdType(country)) {
                        this.getCountryApi(country, feed);
                    }
                })
            }
        })        
    }

    //Recupera l'endPoint per la chiamata al servizio esterpi api livescore dei team
    private async retrieveAndProcessFeed(): Promise<FeedTypeMongo|null|undefined> {
        try {
            const feed:FeedTypeMongo|null = await FeedMongo.findOne({ name: 'teams' }).exec()
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
    private async getCountryApi(countries: CountryMongo.CountryArrayWithIdType, feed: FeedTypeMongo): Promise<void> {
        try {
            this.fetchCountriesData(countries, feed);
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }             
    }

    //Per ogni paese chiama la funzione per recuperare i suoi team
    private async fetchCountriesData(countries: CountryMongo.CountryArrayWithIdType, feed: FeedTypeMongo) {
        for (let country of countries) {
            await this.getTeamPage(`${feed.endPoint}?country_id=${country.externalId}&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`, country);
        }        
    }

    private async getTeamPage(endPoint:string, country:CountryMongo.CountryWithIdType) {
        console.log(endPoint);
        const response = await axios.get(endPoint);
        const apiResponse: GenericApiResponse<TeamApiInterface.Team> = response.data;       
        this.insertTeam(apiResponse,country._id);

        if( response.data.data.next_page != false ) {
            const endPoint = response.data.data.next_page;
            await this.getTeamPage(endPoint, country);            
        }                
    }

    //Inserisce su mongo i team di un paese
    private insertTeam(apiResponse:GenericApiResponse<TeamApiInterface.Team>, countryId:ObjectId ) {
        if (apiResponse.success && Number(apiResponse.data.total) > 0) {
            const transform = (team: TeamApiInterface.Team): TeamMongo.TeamType => ({
                externalId: Number(team.id),
                name: team.name,
                stadium: team.stadium,
                countryId: countryId
            });
                            
            const resultArray = this.transformAPIResponseToArray(apiResponse, 'teams', transform);      

            TeamMongo.Team.insertMany(resultArray)
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
        new FeedProcessor(options.action);
    });
program.parse(process.argv);