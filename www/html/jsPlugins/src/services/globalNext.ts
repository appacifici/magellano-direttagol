import mongoose, { Model } 				from 'mongoose';
import { Socket, io as socketIOClient } from 'socket.io-client';
import { useDispatch }                  from 'react-redux';

import * as TeamMongo                   from "../dbService/models/Team";
import * as CountryMongo                from '../dbService/models/Country';
import Competition,
{ CompetitionSchema, ICompetition }     from '../dbService/models/Competition';
import * as MatchMongo 			        from '../dbService/models/Match';
import FrontendCreateResponse 	        from '../models/FrontendCreateResponse';
import { setMatches,
    updateMatches } 	            from '../match/slice/MatchSlice';

const connectMongoDB = async () => {
	console.log('Mongoose connected to MongoDB');
    try {
		const Competition:Model<ICompetition>       = mongoose.models.Competition || mongoose.model<ICompetition>('Competition', CompetitionSchema);
		const Team:Model<TeamMongo.ITeam>           = mongoose.models.Team || mongoose.model<TeamMongo.ITeam>('Team',TeamMongo.TeamSchema);
        const Country:Model<CountryMongo.ICountry>  = mongoose.models.Team || mongoose.model<CountryMongo.ICountry>('Country',CountryMongo.CountrySchema);
        await mongoose.connect('mongodb://mongodb:27017/livescore', {
            
        });
        console.log('Mongoose connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB');        
        process.exit(1);
    }
};

const connectSocket = () => {
    let lastHidden          = false;
    const dispatch          = useDispatch();
    const host              = 'ws://79.53.22.202:3001';
    const socket: Socket    = socketIOClient(host);
    socket.on('connect', () => {
        console.info('Client connesso');
        
    });
    socket.on('dataLive', (data) => {
        // console.info('Client Riceve data' + data);
        dispatch(updateMatches(JSON.parse(data)));
    });    

    socket.on('ping', function() {    
        let isMobile  = 1;
        // let nowHidden = isMobile == 1 ? document.hidden : false;
        let nowHidden = false;
        socket.emit('pongSocket', {'hidden': nowHidden, 'lastHidden' : lastHidden });            
//                console.log('ping socketLCS:' +document.hidden);  
        //lastHidden = window.document.hidden;
    });
}

const getMenuCompetitions = async () => {
    // Sorting countries first by isTop (descending) and then by name (ascending)
    return CountryMongo.Country.find().sort({ isTop: -1 }).then((countries:CountryMongo.CountryArrayWithIdType) => {
        let response:any = {};

        return Promise.all(countries.map((country:CountryMongo.CountryWithIdType) => {
            return Competition.find({ countryId: country._id }).sort({ name: 1 }).then(competitions => {
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


    const startOfDay 	= new Date(`${dateMatches}T00:00:00Z`);
    const endOfDay 		= new Date(`${dateMatches}T23:59:59Z`);
    const filter:DateMatchFilter = {
        dateMatch: {
            $gte: startOfDay,
            $lte: endOfDay
        },        
    };

    if( competition != undefined ) {
        filter.competitionId = competition;
    }
    
    const matches 		= await MatchMongo.Match.find(filter).populate({
        path: 'competitionId',
        model: 'Competition',
        populate: {
            path: 'countryId',
            model: 'Country'
        }
        }).populate('teamHome').populate('teamAway').exec();
    
    for (let match of matches) {   
        // Processa ogni 'match' come necessario            
        frontendCreateResponse.addLiveMatch(match, match._id.toString());
    };
    
    store.dispatch(setMatches(frontendCreateResponse.objResponse));   

    const competitionsTop = await Competition.find({ isTop: 1 }).lean().exec();
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

export {connectMongoDB,connectSocket,initData,getMenuCompetitions,currentDate};
export type {InitDataReturnType};