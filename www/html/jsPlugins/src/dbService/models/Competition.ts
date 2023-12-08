import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

type CompetitionSeasonType = {
    id:         number;
    name:       string;
    start:      string;      
    end:        string;      
}

type CompetitionType = {    
    externalId:         number;
    countryId:          ObjectId;    
    name:               string;
    permalink:          string;
    active:             number;
    hasGroups:          number;
    isLeague:           number;
    isCup:              number;
    nationalTeamsOnly:  number;
    season:             CompetitionSeasonType;
    isTop?:             number;
}

interface ICompetition extends Document, Omit<CompetitionType, '_id'> {

}
type CompetitionWithIdType      = CompetitionType & { _id: Document['_id'] };
type CompetitionArrayWithIdType = CompetitionWithIdType[];

const CompetitionSchema   = new Schema({
    externalId: { 
        type:       Number, 
        required:   true 
    },
    countryId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Country', 
        required: true 
    },
    name: { 
        type:       String, 
        required:   true, 
        maxlength:  255 
    },    
    permalink: { 
        type:       String, 
        required:   true, 
        maxlength:  255 
    },    
    active: { 
        type:       Number, 
        required:   true, 
        min:        0, 
        max:        1 
    },
    hasGroups: { 
        type:       Number, 
        required:   true, 
        min:        0, 
        max:        1 
    },
    isLeague: { 
        type:       Number, 
        required:   true, 
        min:        0, 
        max:        1 
    }, 
    isCup: { 
        type:       Number, 
        required:   true, 
        min:        0, 
        max:        1 
    }, 
    nationalTeamsOnly: {
        type:       Number, 
        required:   true, 
        min:        0, 
        max:        1 
    }, 
    season: {
        id:         Number,
        name:       String,
        start:      String,      
        end:        String,      
    },
    isTop: { 
        type:       Number, 
        required:   false, 
        min:        0, 
        max:        1 
    },
});

CompetitionSchema.index({ externalId: 1, countryId:1 }, { unique: true });
const Competition = mongoose.models.Competition || mongoose.model('Competition', CompetitionSchema);
export type {ICompetition,CompetitionType, CompetitionWithIdType};
export {CompetitionSchema};
export default Competition;
