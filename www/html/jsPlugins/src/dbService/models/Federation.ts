import mongoose, { Document, Schema, Model } from 'mongoose';

type FederationType = {    
    externalId: number;
    name:       string;
}
type FederationArrayType       = FederationType[];

interface IFederation extends Document, Omit<FederationType, '_id'> {}
type FederationWithIdType      = FederationType & { _id: Document['_id'] };
type FederationArrayWithIdType = FederationWithIdType[];


const FederationSchema = new Schema({
    externalId: { 
        type:       Number, 
        required:   true 
    },
    name: { 
        type:       String, 
        required:   true, 
        maxlength:  255 
    }
});

//Creazione indice e chiave univoca
FederationSchema.index({ externalId: 1 }, { unique: true });

//Un metodo è una funzione per elaborare i dati in un certo modo non un metodo semplice find 
FederationSchema.methods.checkBySource = function(source:string) {
    return mongoose.model('federation').find({ source: this.source }, source);
};

const Federation:      Model<IFederation>     = mongoose.model<IFederation>('federations', FederationSchema);

export {Federation,FederationSchema};
export type {FederationArrayWithIdType,FederationArrayType};