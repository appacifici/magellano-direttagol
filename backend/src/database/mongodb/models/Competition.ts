import mongoose, { Document, Schema } from 'mongoose';

type CompetitionSeasonType = {
    id:         Number;
    name:       string;
    start:      string;      
    end:        string;      
}

type CompetitionType = {    
    externalId:         Number;
    name:               string;
    isReal:             Number;
    active:             Number;
    hasGroups:          Number;
    isLeague:           Number;
    isCup:              Number;
    nationalTeamsOnly:  Number;
    season:             CompetitionSeasonType;
}

type CompetitionArrayType = CompetitionType[];

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

//Un metodo è una funzione per elaborare i dati in un certo modo non un metodo semplice find 
CompetitionSchema.methods.checkBySource = function(source:string) {
    return mongoose.model('Competition').find({ source: this.source }, source);
};
  
const Competition = mongoose.model('Competition', CompetitionSchema);

export {Competition,CompetitionType,CompetitionArrayType,CompetitionSeasonType};