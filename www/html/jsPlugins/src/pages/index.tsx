import React, { useEffect }     from 'react';
import { useDispatch }          from 'react-redux';

import { Socket, io as socketIOClient } from 'socket.io-client';

import mongoose, { Model } 				from 'mongoose';
import * as MatchMongo 			        from '../dbService/models/Match';
import * as TeamMongo                   from "../dbService/models/Team";
import * as CountryMongo                from '../dbService/models/Country';
import FrontendCreateResponse 	        from '../models/FrontendCreateResponse';

import Header                           from '../container/Header';
import Footer                           from '../container/Footer';
import Main                             from '../container/Main';
import MatchesBoard                     from '../match/components/MatchesBoard';
import { setMatches,
         updateMatches } 	            from '../match/slice/MatchSlice';
import { wrapperMatch }                 from '../match/store/MatchStore';
import { MatchesInterface }             from '../match/models/MatchInterface';

import Competition,
{ CompetitionSchema, ICompetition }     from '../dbService/models/Competition';
import { Team, TeamSchema }             from '../dbService/models/Team';


const matchesUpdate:MatchesInterface = {"654bcb0850ad1ee8c57aa3da":{"competition":{"id":"654bcb0850ad1ee8c57aa3da","matches":{"6560e1416d929032388a4c61":{"current_time":"83"}}}},"654bcaf550ad1ee8c57aa2b9":{"competition":{"id":"654bcaf550ad1ee8c57aa2b9","matches":{"6560e1416d929032388a4c9d":{"current_time":"90"},"6560e1416d929032388a4c9b":{"current_time":"88"}}}},"654bcaf950ad1ee8c57aa2ed":{"competition":{"id":"654bcaf950ad1ee8c57aa2ed","matches":{"6560e84dd7a15903991f8d67":{"current_time":"57"},"6560e84dd7a15903991f8d65":{"current_time":"53"},"6560e84dd7a15903991f8d6c":{"current_time":"59"},"6560e84dd7a15903991f8d6e":{"current_time":"60"},"6560e84dd7a15903991f8d81":{"current_time":"58"},"6560e84dd7a15903991f8d83":{"current_time":"59"}}}},"654bcb0c50ad1ee8c57aa40c":{"competition":{"id":"654bcb0c50ad1ee8c57aa40c","matches":{"6560e87fd7a15903991f9ced":{"current_time":"60"}}}},"654bcb0350ad1ee8c57aa37f":{"competition":{"id":"654bcb0350ad1ee8c57aa37f","matches":{"6560ef5b519abfa26c025188":{"status":"ADDED TIME","current_time":"45+"},"6560ef5b519abfa26c025192":{"status":"ADDED TIME","current_time":"45+"},"6560ef5b519abfa26c0251ce":{"status":"HALF TIME BREAK","current_time":"HT","first_half_away_score":"1","first_half_home_score":"0"}}}},"654bd88be5a4549faacdaf62":{"competition":{"id":"654bd88be5a4549faacdaf62","matches":{"6560ef83519abfa26c02563b":{"status":"ADDED TIME","current_time":"45+"}}}},"654bd87be5a4549faacdaf35":{"competition":{"id":"654bd87be5a4549faacdaf35","matches":{"6560ef97519abfa26c025875":{"status":"HALF TIME BREAK","current_time":"HT","first_half_away_score":"3","first_half_home_score":"0"}}}},"654bcb0650ad1ee8c57aa3b2":{"competition":{"id":"654bcb0650ad1ee8c57aa3b2","matches":{"6560f663519abfa26c030cf2":{"current_time":"16"}}}},"654bcb0650ad1ee8c57aa3bb":{"competition":{"id":"654bcb0650ad1ee8c57aa3bb","matches":{"6560f663519abfa26c030cf6":{"current_time":"15"}}}},"654bcaf950ad1ee8c57aa2f6":{"competition":{"id":"654bcaf950ad1ee8c57aa2f6","matches":{"6560f663519abfa26c030d41":{"current_time":"18"}}}},"654bcafd50ad1ee8c57aa334":{"competition":{"id":"654bcafd50ad1ee8c57aa334","matches":{"6560fa10519abfa26c037634":{"status":"IN PLAY","current_time":"1","home_score":"0","away_score":"0"}}}}};

const connectMongoDB = async () => {
	console.log('Mongoose connected to MongoDB');
    try {
		const Competition:Model<ICompetition>       = mongoose.models.Competition || mongoose.model<ICompetition>('Competition', CompetitionSchema);
		const Team:Model<TeamMongo.ITeam>           = mongoose.models.Team || mongoose.model<TeamMongo.ITeam>('Team',TeamSchema);
        const Country:Model<CountryMongo.ICountry>  = mongoose.models.Team || mongoose.model<CountryMongo.ICountry>('Country',CountryMongo.CountrySchema);
        await mongoose.connect('mongodb://mongodb:27017/livescore', {
            
        });
        console.log('Mongoose connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB');        
        process.exit(1);
    }
};

export const getServerSideProps = wrapperMatch.getServerSideProps(
    (store) => async (context) => {     	

		const frontendCreateResponse = new FrontendCreateResponse();
		await connectMongoDB();
         
        let nationsCompetitions:any = {};
        await buildResponse().then(response => {
            nationsCompetitions = JSON.stringify(response, null, 2);
        }).catch(error => {
            console.error('Error:', error);
        });  

		const startOfDay 	= new Date("2023-11-27T00:00:00Z");
		const endOfDay 		= new Date("2023-11-27T23:59:59Z");
		const matches 		= await MatchMongo.Match.find({
			dateMatch: {
				$gte: startOfDay,
				$lte: endOfDay
			}
		}).populate({
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
        
		return {
			props: {
                'nationsCompetitions': nationsCompetitions
            },
		};
	}
);

const buildResponse = async () => {
    return CountryMongo.Country.find().then(countries => {
        let response:any = {};

        return Promise.all(countries.map(country => {
            return Competition.find({ countryId: country._id }).then(competitions => {
                let competitionsObj:any = {};
                competitions.forEach(comp => {
                    competitionsObj[comp._id] = { name: comp.name };
                });

                response[country._id] = {
                    country: {
                        id: country._id,
                        name: country.name,
                        competitions: competitionsObj
                    }
                };
            });
        })).then(() => response);
    });
}

function MatchesBoardPage(data:any) {    
    const dispatch = useDispatch();
    let lastHidden = false;

    const host = 'ws://79.23.219.60:3001';
    const socket: Socket = socketIOClient(host);
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

    

    return(  
        <>                                                        
            <Header/>            
                <Main nationsCompetitions={data.nationsCompetitions} MatchBoard={<MatchesBoard/>}/>
            <Footer/>            
        </>
    );
}

export default MatchesBoardPage;