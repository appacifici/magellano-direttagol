import mongoose, { Document, Schema } from 'mongoose';

type CountryType = {    
    externalId: Number;
    name:       string;
    isReal:     Number;
}
type CountryArrayType = CountryType[];

const CountrySchema = new Schema({
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
    } 
});

//Creazione indice e chiave univoca
CountrySchema.index({ externalId: 1 }, { unique: true });

//Un metodo è una funzione per elaborare i dati in un certo modo non un metodo semplice find 
CountrySchema.methods.checkBySource = function(source:string) {
    return mongoose.model('country').find({ source: this.source }, source);
};
  
const country = mongoose.model('country', CountrySchema);

export {country,CountryType,CountryArrayType};