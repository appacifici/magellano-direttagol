import mongoose, { Document, Schema, Model } from 'mongoose';

type TeamType = {    
    externalId:         number;
    name:               string;
    stadium:            string;
    countryId:          number;    
}

interface ITeam extends TeamType {}
interface ITeam extends Document {}

const TeamSchema   = new Schema({
    externalId: { 
        type:       Number, 
        required:   true 
    },
    name: { 
        type:       String, 
        required:   true, 
        maxlength:  255 
    },
    stadium: { 
        type:       String, 
        required:   true,      
    },
    countryId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Country', 
        required: true 
    }
});

//Creazione indice e chiave univoca
TeamSchema.index({ externalId: 1 }, { unique: true });

export {TeamType,ITeam,TeamSchema};