import axios                                from "axios";
import { Command }                          from 'commander';

import { GenericApiResponse }               from "../interface/API/GlobalInterface";
import { Feed as FeedMongo, 
         FeedType as FeedTypeMongo }        from "../../database/mongodb/models/Feed";

import * as FederationMongo                 from "../../database/mongodb/models/Federation";
import * as FederationApiInterface          from "../interface/API/FederationInterface";

import BaseApi                              from "./BaseApi";

class FederationProcessor extends BaseApi  {
    constructor() {
        super();                
        this.importAll();
    }

    private importAll() :void {
        const feed:Promise<FeedTypeMongo|null|undefined> = this.retrieveAndProcessFeed();
        feed.then( (feed) => {
            if (this.isFeedType(feed)) {
                this.getFederationApi(feed);
            }
        })
    }

    private async retrieveAndProcessFeed(): Promise<FeedTypeMongo|null|undefined> {
        try {
            const feed:FeedTypeMongo|null = await FeedMongo.findOne({ name: 'federations' }).exec()
            return feed;             
        } catch (error) {
            console.error('Errore durante la ricerca del feed:', error);
        }
    }

    private isFeedType(feed: FeedTypeMongo|null|undefined): feed is FeedTypeMongo {
        return feed !== null;
    }

    private async getFederationApi(feed: FeedTypeMongo): Promise<void> {
        try {
            console.log(`${feed.endPoint}?&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`);
            const response = await axios.get(`${feed.endPoint}?&key=Ch8ND10XDfUlV77V&secret=fYiWw9pN8mi6dMyQ4GDHIEFlUAHPHOKX`);
            const apiResponse: GenericApiResponse<FederationApiInterface.Federation> = response.data;

            console.log(apiResponse.success);
            if (apiResponse.success) {
                const transform = (federation: FederationApiInterface.Federation): FederationMongo.FederationType => ({
                    externalId: Number(federation.id),
                    name: federation.name,
                });
                                
                const resultArray = this.transformAPIResponseToArray(apiResponse, 'federation', transform);      

                FederationMongo.Federation.insertMany(resultArray)
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
        new FederationProcessor();
    });
program.parse(process.argv);