import axios                                from "axios";
import { Command }                          from 'commander';
import {  ObjectId }                        from 'mongoose';

import { Feed as FeedMongo, 
    FeedType as FeedTypeMongo }             from "../../database/mongodb/models/Feed";
import { GenericApiResponse }               from "../interface/API/GlobalInterface";
import  Competition                         from "../../database/mongodb/models/Competition";
import * as CountryMongo                    from "../../database/mongodb/models/Country";
import * as FederationMongo                 from "../../database/mongodb/models/Federation";
import * as CompetitionApiInterface         from "../interface/API/CompetitionInterface";
import BaseApi                              from "./BaseApi";
import StringUtility                        from "../../services/StringUtility";   
import type { ICompetition, CompetitionType, CompetitionWithIdType, CompetitionArrayWithIdType } from "../../database/mongodb/models/Competition";


class CompetitionProcessor extends BaseApi  {
    constructor(action:string) {
        super();
                
        switch( action ) {
            case 'importAllCompetitionByFederation':
                this.importAllCompetition('federation');
            break;
            case 'importAllCompetitionByCountry':
                this.importAllCompetition('country');
            break;
            case 'setTopCompetition':
                this.setTopCompetition();
            break;
        }
    }

    private importAllCompetition(byFeed:string) :void {        
        const feed:Promise<FeedTypeMongo|null|undefined> = this.getFeedByName('competitions');
        feed.then( (feed) => {
            if (this.isValidDataType(feed)) {
                let elements: Promise<FederationMongo.FederationArrayWithIdType | CountryMongo.CountryArrayWithIdType | null | undefined>;

                switch (byFeed) {
                    case 'federation':
                        elements = this.retrieveAndProcessCountries() as Promise<FederationMongo.FederationArrayWithIdType | null | undefined>;
                        break;
                    case 'country':
                        elements = this.retrieveAndProcessCountries() as Promise<CountryMongo.CountryArrayWithIdType | null | undefined>;
                        break;
                    default:
                        elements = Promise.resolve(undefined);
                        break;
                }
                
                elements.then( (element) => {
                    if (this.isValidDataType(element)) {
                        this.fetchCountriesData(element, feed, byFeed);
                    }
                })
            }
        })        
    }        

    //Per ogni paese chiama la funzione per recuperare i suoi team
    private async fetchCountriesData(elements: CountryMongo.CountryArrayWithIdType|FederationMongo.FederationArrayWithIdType, feed: FeedTypeMongo, byFeed:string): Promise<void> {
        try {                    
            const countryWorldId = await this.getCountryByName('Coppe');
            for (let element of elements) {     
                let endPoint:string = '';
                let countryId:ObjectId|undefined = undefined;
                if( byFeed == 'federation') {
                    endPoint  = `${feed.endPoint}?federation_id=${element.externalId}&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`;         
                    if (this.isValidDataType(countryWorldId)) {
                        countryId = countryWorldId._id;  
                    }                                 
                } else {
                    endPoint  = `${feed.endPoint}?country_id=${element.externalId}&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`;
                    countryId = element._id;
                }
                
                console.log(endPoint);
                const response = await axios.get(endPoint);
                const apiResponse: GenericApiResponse<CompetitionApiInterface.Competition> = response.data;    
                if (this.isValidDataType(countryId)) {   
                    this.insertCompetition(apiResponse,countryId);
                }
            }    
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }        
    }

    //Inserisce su mongo i team di un paese
    private insertCompetition(apiResponse:GenericApiResponse<CompetitionApiInterface.Competition>, countryId:ObjectId ) {
        if (apiResponse.success ) {
            const transform = (competition: CompetitionApiInterface.Competition): CompetitionType => ({
                externalId:         Number(competition.id),
                countryId:          countryId,
                name:               competition.name,                
                permalink:          StringUtility.sanitizeString(competition.name),
                active:             Number(competition.active),
                hasGroups:          Number(competition.has_groups),
                isLeague:           Number(competition.is_league),
                isCup:              Number(competition.is_cup),
                isTop:              0,
                img:                StringUtility.sanitizeString(competition.name),
                nationalTeamsOnly:  Number(competition.national_teams_only),
                season: {
                    id:         Number(competition.season.id),
                    name:       competition.season.name,
                    start:      competition.season.start,      
                    end:        competition.season.end
                }
            });
                            
            const resultArray = this.transformAPIResponseToArray(apiResponse, 'competition', transform);      

            Competition.insertMany(resultArray)
            .then((docs) => {
                console.log('Feeds inserted successfully');
            })
            .catch((err) => {
                console.error('Error inserting feeds:', err);
            });
        }
    }

    private setTopCompetition() {
        /**
         * 4   = Serie A
         * 47   = Serie B
         * 3   = LaLiga Santander
         * 244 = Europa League
         * 245 = Europa League
         * 5 = Ligue 1
         * 2 = Premier Ligue
         * 1 = Bundesliga
         */
        Competition.updateMany(
            { externalId: { $in: [244, 245, 3, 4, 5, 47, 2, 1] } }, // Criterio di selezione
            { $set: { isTop: 1 } }                 // Aggiornamento
        )
        .then(result => {
            console.log('Aggiornamento completato:', result);
        })
        .catch(err => {
            console.error('Errore durante l\'aggiornamento:', err);
        });

    }
}

const program = new Command();
program.version('1.0.0').description('CLI team commander') 
    .option('-a, --action <type>', 'Azione da lanciare')
    .action((options) => {    
        new CompetitionProcessor(options.action);
    });
program.parse(process.argv);