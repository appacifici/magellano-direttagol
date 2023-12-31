import mongoose, { Document, Schema, Model, ObjectId, Types } from 'mongoose';

type CountryType = {    
    externalId: number;
    name:       string;
    permalink:  string;
    img?:       string;
    isReal:     number;
    isTop:      number;
}
type CountryArrayType       = CountryType[];

interface ICountry extends Document, Omit<CountryType, '_id'> {}
type CountryWithIdType      = CountryType & { _id: Document['_id'] };
type CountryArrayWithIdType = CountryWithIdType[];


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
    permalink: { 
        type:       String, 
        required:   true, 
        maxlength:  255 
    },    
    img: { 
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
    isTop: { 
        type:       Number, 
        required:   false, 
        min:        0, 
        max:        1 
    },
});

//Creazione indice e chiave univoca
CountrySchema.index({ externalId: 1 }, { unique: true });
CountrySchema.index({ name: 1 });
CountrySchema.index({ isTop: -1 });


//Un metodo è una funzione per elaborare i dati in un certo modo non un metodo semplice find 
CountrySchema.methods.checkBySource = function(source:string) {
    return mongoose.model('country').find({ source: this.source }, source);
};

const Country:Model<ICountry> = mongoose.models.Country || mongoose.model<ICountry>('Country', CountrySchema);

export {Country,CountrySchema};
export type {ICountry,CountryArrayWithIdType,CountryWithIdType,CountryType};
export default Country;