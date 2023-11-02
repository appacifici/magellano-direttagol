import mongoose, { Document, Schema, Model } from 'mongoose';

type MatchType = {
    competitionId:      Schema.Types.ObjectId;
    teamHome:           Schema.Types.ObjectId;
    teamAway:           Schema.Types.ObjectId;
    timeMatch:          string;    
    dateMatch:          string;    
    extMatchId:         number;
    fixtureId:          number;
    score:              string;
    status:             string;
    halfTimeScore:      string;
    fullTimeScore:      string;
    extraTimeScore:     string;
    penaltyTimeScore:   string;
    lastChanged:        Date;
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
        type: String 
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

MatchSchema.index({ fixtureId:1, externalId: 1 }, { unique: true });
const Match:Model<IMatch> = mongoose.model<IMatch>('Match', MatchSchema);

export {Match,MatchType,IMatch,MatchSchema};