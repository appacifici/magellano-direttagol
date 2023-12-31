import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

type TeamType = {    
    externalId:         number;
    name:               string;
    img?:               string;
    stadium?:           string;
    countryId:          ObjectId;    
}

interface ITeam extends Document, Omit<TeamType, '_id'> {}
type TeamWithIdType      = TeamType & { _id: Document['_id'] };
type TeamArrayWithIdType = TeamWithIdType[];

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
    img: { 
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
        required: true,
        index:true
    }
});

//Creazione indice e chiave univoca
TeamSchema.index({ externalId: 1 }, { unique: true });
const Team:Model<ITeam> = mongoose.models.Team || mongoose.model<ITeam>('Team',TeamSchema);

export { Team, TeamSchema };
export type { TeamType, TeamArrayWithIdType, TeamWithIdType, ITeam };