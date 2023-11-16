import FrontendCreateResponse   from "../models/FrontendCreateResponse";
import { Competition }          from "../database/mongodb/models/Competition";
import * as TeamMongo           from "../database/mongodb/models/Team";
import * as MatchMongo          from "../database/mongodb/models/Match";
import connectMongoDB           from "../database/mongodb/connect";

connectMongoDB();

class FrontendData{
    private frontendCreateResponse:FrontendCreateResponse; 

    constructor() {  
        this.frontendCreateResponse = new FrontendCreateResponse();         
        this.initializeMatches();
    }

    private async initializeMatches() {
        const matches = await this.getMatches();
        if (matches && Array.isArray(matches)) {
            for (const match of matches) {                
                this.frontendCreateResponse.addLiveMatch(match, match._id);
            }
        } else {            
            console.log('Nessun match trovato o errore nella ricerca dei match');
        }
        console.log(JSON.stringify(this.frontendCreateResponse.objResponse));
    }

    private async getMatches(): Promise<MatchMongo.MatchArrayWithIdType|boolean> {    
        try {            
            const filter:object = {dateMatch:"2023-11-10"};

            const matches:MatchMongo.MatchArrayWithIdType|null = await MatchMongo.Match.find(filter).populate('competitionId').populate('teamHome').populate('teamAway').exec()
            if( matches != null ) {
                return matches;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Errore durante la ricerca del match:', error);
        }
        return false;
    }
}

export default FrontendData;