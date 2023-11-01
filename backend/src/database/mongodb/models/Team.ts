import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

type TeamType = {    
    externalId:         number;
    name:               string;
    stadium?:           string;
    countryId:          ObjectId;    
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
        required:   false,      
    },
    countryId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Country', 
        required: true 
    }
});

//Creazione indice e chiave univoca
TeamSchema.index({ externalId: 1 }, { unique: true });
const Team:         Model<ITeam>        = mongoose.model<ITeam>('Team', TeamSchema);

export {TeamType,ITeam,Team,TeamSchema};