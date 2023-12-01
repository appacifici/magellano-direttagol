import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

type CompetitionSeasonType = {
    id:         number;
    name:       string;
    start:      string;      
    end:        string;      
}

type CompetitionType = {    
    externalId:         number;
    countryId?:         ObjectId;    
    name:               string;
    active:             number;
    hasGroups:          number;
    isLeague:           number;
    isCup:              number;
    nationalTeamsOnly:  number;
    season:             CompetitionSeasonType;
    isTop?:             number;
    img?:               string;
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
    img: { 
        type:       String, 
        required:   true, 
        maxlength:  255 
    },
});


//Creazione indice e chiave univoca
CompetitionSchema.index({ externalId: 1, countryId:1 }, { unique: true });
const Competition:  Model<ICompetition> = mongoose.model<ICompetition>('Competition', CompetitionSchema);
export {Competition,CompetitionType,CompetitionArrayWithIdType,CompetitionWithIdType,CompetitionSeasonType,ICompetition,CompetitionSchema};