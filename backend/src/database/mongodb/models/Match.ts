import mongoose, { Document, Schema, Model } from 'mongoose';

type MatchType = {
    competitionId:  Schema.Types.ObjectId;
    teamHome:       Schema.Types.ObjectId;
    teamAway:       Schema.Types.ObjectId;
    timeMatch:      String;    
    dateMatch:      String;    
}

interface IMatch extends MatchType {}
interface IMatch extends Document {}

const MatchSchema = new Schema({
    extMatchId: { 
        type: Number
    },
    fixtureId: { 
        type: Number
    },    
    competitionId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Competition', 
        required: true 
    },
    teamHome: { 
        type: Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true 
    },
    teamAway: { 
        type: Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true 
    },
    timeMatch: { 
        type: Number 
    },
    dateMatch: { 
        type: Date, 
        required: true 
    },
    score: { 
        type: String         
    },
    status: { 
        type: String         
    },
    halfTimeScore: { 
        type: String         
    },
    fullTimeScore: { 
        type: String         
    },
    extraTimeScore: { 
        type: String         
    },
    penaltyTimeScore: { 
        type: String         
    },
    lastChanged: { 
        type: Date
    }
});

//Creazione indice e chiave univoca
MatchSchema.index({ externalId: 1 }, { unique: true });

export {MatchType,IMatch,MatchSchema};