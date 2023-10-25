import mongoose, { Document, Schema } from 'mongoose';
import connectMongoDB from '../connect';

// Definizione delle costanti di classe
const FORMAT_FEED = {
    JSON: 1,
    XML: 2,    
};

const SOURCE_FEED = {
    LIVE_SCORE_API_COM: 'https://live-score-api.com/'
};

type FeedType = {    
    source: string;
    name: string;
    endPoint: string;
    format: Number;
}
type FeedArrayType = FeedType[];

const FeedSchema = new Schema({
        // MongoDB utilizza _id come campo chiave primaria di default ed è di tipo ObjectId. Non c'è bisogno di specificare un ID autoincrement.
        source: {
            type: String,
            required: true,
            maxlength: 255
        },
        name: {
            type: String,
            required: true,
            maxlength: 255,
            unique: true            
        },
        endPoint: {
            type: String,
            required: true,
            maxlength: 255
        },
        format: {
            type: Number,
            required: true,
            enum: Object.values(FORMAT_FEED),  // Accetta solo valori dalle costanti definite
        } 
    }
);

//Creazione indice e chiave univoca
FeedSchema.index({ name: 1, format: 1 }, { unique: true });

//Un metodo è una funzione per elaborare i dati in un certo modo non un metodo semplice find 
FeedSchema.methods.checkBySource = function(source:string) {
    return mongoose.model('Feed').find({ source: this.source }, source);
};
  
const Feed = mongoose.model('Feed', FeedSchema);

export {Feed,FORMAT_FEED,SOURCE_FEED,FeedType,FeedArrayType};