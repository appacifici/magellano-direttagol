import { createObjectCsvWriter } from 'csv-writer';
import * as CountryMongo    from "../database/mongodb/models/Country";
import BaseApi from '../liveScoreApi/api/BaseApi';

class ExportMongooseCsv extends BaseApi{

    constructor() {
        super();                
    }

    public async exportCountry() {
        const csvWriter = createObjectCsvWriter({
            path: 'output.csv', // Percorso dove verrà salvato il file CSV
            header: [
              { id: 'id', title: 'ID' },
              { id: 'name', title: 'Name' },
              { id: 'img', title: 'img' },
              // Aggiungi altre intestazioni se necessario
            ]
          });

        const records:CountryMongo.CountryArrayWithIdType = await CountryMongo.Country.find().exec();                    

        csvWriter.writeRecords(records)
        .then(() => console.log('Il file CSV è stato scritto con successo.'))
        .catch(err => console.error('Si è verificato un errore durante la scrittura del file CSV:', err));
    }

}
const exportMongooseCsv = new ExportMongooseCsv();
exportMongooseCsv.exportCountry();