import mongoose, { Document, Schema, Model } from 'mongoose';

type CompetitionSeasonType = {
    id:         number;
    name:       string;
    start:      string;      
    end:        string;      
}

type CompetitionType = {    
    externalId:         number;
    name:               string;
    isReal:             number;
    active:             number;
    hasGroups:          number;
    isLeague:           number;
    isCup:              number;
    nationalTeamsOnly:  number;
    season:             CompetitionSeasonType;
}

type CompetitionArrayType = CompetitionType[];
interface ICompetition extends CompetitionType {}
interface ICompetition extends Document {}

const CompetitionSchema   = new Schema({
    externalId: { 
        type:       Number, 
        required:   true 
    },
    name: { 
        type:       String, 
        required:   true, 
        maxlength:  255 
    },
    isReal: { 
        type:       Number, 
        required:   true, 
        min:        0, 
        max:        1 
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
    } 
});

//Creazione indice e chiave univoca
CompetitionSchema.index({ externalId: 1 }, { unique: true });

export {CompetitionType,CompetitionArrayType,CompetitionSeasonType,ICompetition,CompetitionSchema};