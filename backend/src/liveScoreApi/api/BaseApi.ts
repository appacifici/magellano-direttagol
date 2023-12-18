import connectMongoDB       from "../../database/mongodb/connect";
import { GenericApiResponse } from "../interface/API/GlobalInterface";
import { Feed as FeedMongo, 
    FeedType as FeedTypeMongo }             from "../../database/mongodb/models/Feed";

import Country                    from "../../database/mongodb/models/Country";
import {ICountry,CountryArrayWithIdType,CountryWithIdType,CountryType} from "../../database/mongodb/models/Country";

import Competition                          from "../../database/mongodb/models/Competition";
import type { ICompetition, CompetitionType, CompetitionWithIdType, CompetitionArrayWithIdType } from "../../database/mongodb/models/Competition";
import * as TeamMongo                       from "../../database/mongodb/models/Team";

import Federation, { FederationArrayWithIdType } from "../../database/mongodb/models/Federation";

type TransformFunction<T, U> = (input: T) => U;

class BaseApi {

    constructor() {
        connectMongoDB();
    }

    //Verifica se è del tipo corretto aspettato
    public isValidDataType<T>(data: T | null | undefined): data is T {
        return data !== null && data !== undefined && data !== false;
    }

    //Recupera l'endPoint per la chiamata al servizio esterpi api livescore dei team
    public async getFeedByName(nameFeed:string): Promise<FeedTypeMongo|null|undefined> {
        try {
            const feed:FeedTypeMongo|null = await FeedMongo.findOne({ name: nameFeed }).exec()
            return feed;             
        } catch (error) {
            console.error('Errore durante la ricerca del feed:', error);
        }
    }

    //Recupera tutti i contries su MongoDB
    public async retrieveAndProcessCountries(): Promise<CountryArrayWithIdType|null|undefined> {
        try {
            const countries:CountryArrayWithIdType|null = await Country.find({}).exec()
            console.log(countries);
            return countries;             
        } catch (error) {
            console.error('Errore durante la ricerca del country:', error);
        }
    }

    public async retrieveAndProcessFederations(): Promise<FederationArrayWithIdType|null|undefined> {
        try {
            const federations:FederationArrayWithIdType|null = await Federation.find({}).exec()
            console.log(federations);
            return federations;             
        } catch (error) {
            console.error('Errore durante la ricerca del federations:', error);
        }
    }
   
    public async retrieveAndProcessCompetitions(): Promise<CompetitionArrayWithIdType|null|undefined> {
        try {
            const competitions:CompetitionArrayWithIdType|null = await Competition.find({}).exec()
            return competitions;             
        } catch (error) {
            console.error('Errore durante la ricerca della competition:', error);
        }
    }
    
    public async getOneCompetitionByFilter(filter:object): Promise<CompetitionWithIdType|null|undefined> {
        try {
            const competition:CompetitionWithIdType|null = await Competition.findOne(filter).exec()
            return competition;             
        } catch (error) {
            console.error('Errore durante la ricerca della competition:', error);
        }
    }

    public async getTeamByFilter(filter:object): Promise<TeamMongo.TeamWithIdType|null|undefined> {
        try {
            const team:TeamMongo.TeamWithIdType|null = await TeamMongo.Team.findOne(filter).exec()
            return team;             
        } catch (error) {
            console.error('Errore durante la ricerca del team:', error);
        }
    }

    public async getCountryByName(search:string):Promise<CountryWithIdType|null|undefined> {
        try {
            const countryId:CountryWithIdType|null = await Country.findOne({ name: search }).exec()
            return countryId;              
        } catch (error) {
            console.error('Errore durante la ricerca del caountry by name:', error);
    }
    }

    private transformItemToType<T, U>(item: T, transformFn: TransformFunction<T, U>): U {
        return transformFn(item);
    }
    
    public transformAPIResponseToArray<T, U>(
        response: GenericApiResponse<T>,
        key: string,
        transformFn: TransformFunction<T, U>
    ): U[] {        
        return response.data[key].map(item => 
            this.transformItemToType(item, transformFn)
        );
    }
}

export default BaseApi;