import mongoose                 		from 'mongoose';

import * as TeamMongo                   from "../dbService/models/Team";
import * as CountryMongo                from '../dbService/models/Country';
import Competition,
{ CompetitionSchema, ICompetition }     from '../dbService/models/Competition';
import * as MatchMongo 			        from '../dbService/models/Match';
import FrontendCreateResponse 	        from '../models/FrontendCreateResponse';
import { setMatches } 	                from '../match/slice/MatchSlice';


const connectMongoDB = async () => {	
    try {        
        mongoose.models.Competition || mongoose.model<ICompetition>('Competition', CompetitionSchema);
		mongoose.models.Team || mongoose.model<TeamMongo.ITeam>('Team',TeamMongo.TeamSchema);
        mongoose.models.Team || mongoose.model<CountryMongo.ICountry>('Country',CountryMongo.CountrySchema);
        await mongoose.connect(`mongodb://${process.env.NEXT_PUBLIC_MONGO_DB_HOST}:27017/livescore`, {
            
        });
        console.log(`Mongoose connected to MongoDB: mongodb://${process.env.NEXT_PUBLIC_MONGO_DB_HOST}:27017/livescore` );
    } catch (err) {
        console.error('Error connecting to MongoDB');        
        process.exit(1);
    }
};

// const connectSocket = () => {
//     let lastHidden          = false;
//     const dispatch          = useDispatch();
//     const host              = process.env.NEXT_PUBLIC_WS_HOST;
//     const socket: Socket    = socketIOClient(host);
//     socket.on('connect', () => {
//         console.info('Client connesso: '+process.env.NEXT_PUBLIC_WS_HOST);
        
//     });
//     socket.on('dataLive', (data) => {
//         // console.info('Client Riceve data' + data);
//         dispatch(updateMatches(JSON.parse(data)));
//     });    

//     socket.on('ping', function() {    
//         //let isMobile  = 1;
//         // let nowHidden = isMobile == 1 ? document.hidden : false;
//         let nowHidden = false;
//         socket.emit('pongSocket', {'hidden': nowHidden, 'lastHidden' : lastHidden });            
// //                console.log('ping socketLCS:' +document.hidden);  
//         //lastHidden = window.document.hidden;
//     });
// }

const getMenuCompetitions = async () => {
    // Sorting countries first by isTop (descending) and then by name (ascending)
    return CountryMongo.Country.find().sort({ isTop: -1 }).then((countries:CountryMongo.CountryArrayWithIdType) => {
        let response:any = {};

        return Promise.all(countries.map((country:CountryMongo.CountryWithIdType) => {
            return Competition.find({ countryId: country._id }).sort({ name: -1 }).then(competitions => {
                let competitionsObj:any = {};
                competitions.forEach(comp => {
                    competitionsObj[comp._id] = { name: comp.name, permalink: comp.permalink };
                });

                response[country._id] = {
                    country: {
                        id: country._id,
                        name: country.name,
                        permalink: country.permalink,
                        img: country.img,
                        competitions: competitionsObj
                    }
                };
            });
        })).then(() => response); 
    });
}

const initData = async(store:any, dateMatches:string | string[] | (() => string), competition?:any):Promise<InitDataReturnType> => {
    const frontendCreateResponse = new FrontendCreateResponse();

    let nationsCompetitions:any = {};
    await getMenuCompetitions().then(response => {        
        nationsCompetitions = JSON.stringify(response, null, 2);
    }).catch(error => {
        console.error('Error:', error);
    }); 

    console.log(nationsCompetitions);

    const startOfDay 	= new Date(`${dateMatches}T00:00:00Z`);
    const endOfDay 		= new Date(`${dateMatches}T23:59:59Z`);
    const filter:DateMatchFilter = {
        dateMatch: {
            $gte: startOfDay,
            $lte: endOfDay
        },        
    };
    
    if( competition !== undefined ) {
        filter.competitionId = competition._id;
    }    

    // const matches = await MatchMongo.Match.find(filter)
    // .populate({
    //     path: 'competitionId',
    //     model: 'Competition',        
    //     populate: {
    //         path: 'countryId',
    //         model: 'Country'
    //     },        
    // })
    // .populate({
    //     path: 'teamHome',
    //     model: 'Team',
    //     populate: {
    //         path: 'countryId',
    //         model: 'Country'
    //     }
    // })
    // .populate({
    //     path: 'teamAway',
    //     model: 'Team',
    //     populate: {
    //         path: 'countryId',
    //         model: 'Country'
    //     }
    // })
    // .exec();
    
    const matches = await MatchMongo.Match.aggregate([
        { $match: filter },
        { 
            $lookup: {
                from: 'competitions', // nome della collezione 'Competition'
                localField: 'competitionId',
                foreignField: '_id',
                as: 'competitionId'
            }
        },
        { $unwind: '$competitionId' },
        { 
            $lookup: {
                from: 'countries', // nome della collezione 'Country' per la competizione
                localField: 'competitionId.countryId',
                foreignField: '_id',
                as: 'competitionCountry'
            }
        },
        { $unwind: '$competitionCountry' },
        { 
            $lookup: {
                from: 'teams', // nome della collezione 'Team' per il team di casa
                localField: 'teamHome',
                foreignField: '_id',
                as: 'teamHome'
            }
        },
        { $unwind: '$teamHome' },
        { 
            $lookup: {
                from: 'countries', // nome della collezione 'Country' per il team di casa
                localField: 'teamHome.countryId',
                foreignField: '_id',
                as: 'homeCountry'
            }
        },
        { $unwind: '$homeCountry' },
        { 
            $lookup: {
                from: 'teams', // nome della collezione 'Team' per il team ospite
                localField: 'teamAway',
                foreignField: '_id',
                as: 'teamAway'
            }
        },
        { $unwind: '$teamAway' },
        { 
            $lookup: {
                from: 'countries', // nome della collezione 'Country' per il team ospite
                localField: 'teamAway.countryId',
                foreignField: '_id',
                as: 'awayCountry'
            }
        },
        { $unwind: '$awayCountry' },
        { 
            $sort: { 
                'competitionId.isTop': -1,
                'competitionCountry.isTop': -1 
            }
        }
    ]);
    

    for (let match of matches) {           
        // Processa ogni 'match' come necessario            
        frontendCreateResponse.addLiveMatch(match, match._id.toString());
    };
    
    store.dispatch(setMatches(frontendCreateResponse.objResponse));   

    const competitionsTop = await Competition.find({ isTop: 1 }).populate({
        path: 'countryId',
        model: 'Country'        
    }).lean().exec();
    const competitionsTopJSON = JSON.stringify(competitionsTop);
    
    return {        
        nationsCompetitions: nationsCompetitions,
        competitionsTop: competitionsTopJSON                 
    };
}

const currentDate = ():string => {
    const currentDate:Date = new Date();
    const year:number      = currentDate.getFullYear();
    const month:string     = String(currentDate.getMonth() + 1).padStart(2, '0'); // Aggiunge uno a getMonth() perché i mesi partono da 0
    const day:string       = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate:string = `${year}-${month}-${day}`;
    return formattedDate;
}

const sanitizeString = (str:string) => {
    // Elimina i caratteri speciali eccetto lo spazio
    let sanitizedString = str.replace(/[^a-zA-Z0-9 ]/g, "");

    // Sostituisce gli spazi con il simbolo -
    sanitizedString = sanitizedString.replace(/\s+/g, "-");

    return sanitizedString;
}

type InitDataReturnType = {
    nationsCompetitions: string; // Il tipo dovrebbe essere corretto se nationsCompetitions è una stringa JSON
    competitionsTop: string; // Il tipo dovrebbe essere corretto se competitionsTop è una stringa JSON
};

type DateMatchFilter = {
    dateMatch: {
      $gte: Date;
      $lte: Date;
    },
    competitionId?:any
};

export {connectMongoDB,initData,getMenuCompetitions,currentDate,sanitizeString};
export type {InitDataReturnType};