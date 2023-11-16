import mongoose, { Document, Schema, Model } from 'mongoose';
import {CompetitionType} from './Competition';
import { TeamWithIdType } from './Team';

type MatchType = {
    competitionId:      Schema.Types.ObjectId|CompetitionType;
    teamHome:           Schema.Types.ObjectId|TeamWithIdType;
    teamAway:           Schema.Types.ObjectId|TeamWithIdType;
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

interface IMatch extends Document, Omit<MatchType, '_id'> {}
type MatchWithIdType      = MatchType & { _id: Document['_id'] };
type MatchArrayWithIdType = MatchWithIdType[];

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
        required: true,
        index: true
    },
    teamHome: { 
        type: Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true,
        index: true
    },
    teamAway: { 
        type: Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true,
        index: true 
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

MatchSchema.index({ fixtureId:1, extMatchId: 1 }, { unique: true });
MatchSchema.index({ dateMatch: 1 });
MatchSchema.index({ competitionId: 1, teamHome: 1, teamAway: 1 });
const Match:Model<IMatch> = mongoose.model<IMatch>('Match');

export {Match,MatchSchema};