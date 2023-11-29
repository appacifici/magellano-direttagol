import axios                                from "axios";
import { Command }                          from 'commander';

import { GenericApiResponse }               from "../interface/API/GlobalInterface";
import { Feed as FeedMongo, 
         FeedType as FeedTypeMongo }        from "../../database/mongodb/models/Feed";

import * as CountryMongo                    from "../../database/mongodb/models/Country";
import * as CountryApiInterface             from "../interface/API/CountryInterface";

import BaseApi                              from "./BaseApi";

class CountryProcessor extends BaseApi  {
    constructor(action:string) {
        super();
                
        switch( action ) {
            case 'importAllCountries':
                this.importAllCountries();
            break;
        }
    }

    private importAllCountries() :void {
        const feed:Promise<FeedTypeMongo|null|undefined> = this.retrieveAndProcessFeed();
        feed.then( (feed) => {
            if (this.isFeedType(feed)) {
                this.getCountryApi(feed);
            }
        })
    }

    private async retrieveAndProcessFeed(): Promise<FeedTypeMongo|null|undefined> {
        try {
            const feed:FeedTypeMongo|null = await FeedMongo.findOne({ name: 'countries' }).exec()
            return feed;             
        } catch (error) {
            console.error('Errore durante la ricerca del feed:', error);
        }
    }

    private isFeedType(feed: FeedTypeMongo|null|undefined): feed is FeedTypeMongo {
        return feed !== null;
    }

    private async getCountryApi(feed: FeedTypeMongo): Promise<void> {
        try {
            const response = await axios.get(`${feed.endPoint}?&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`);
            const apiResponse: GenericApiResponse<CountryApiInterface.Country> = response.data;

            console.log(apiResponse.success);
            if (apiResponse.success) {
                const transform = (country: CountryApiInterface.Country): CountryMongo.CountryType => ({
                    externalId: Number(country.id),
                    name: country.name,
                    isReal: Number(country.is_real),
                    isTop: 0,
                });
                                
                const resultArray = this.transformAPIResponseToArray(apiResponse, 'country', transform);      

                CountryMongo.Country.insertMany(resultArray)
                .then((docs) => {
                    console.log('Feeds inserted successfully:', docs);
                })
                .catch((err) => {
                    console.error('Error inserting feeds:', err);
                });
            }

        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    }   
}


const program = new Command();
program.version('1.0.0').description('CLI country commander') 
    .option('-a, --action <type>', 'Azione da lanciare')
    .action((options) => {    
        new CountryProcessor(options.action);
    });
program.parse(process.argv);