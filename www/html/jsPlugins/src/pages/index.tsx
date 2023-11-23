import React, { useEffect }     from 'react';
import { 
    Provider,
    TypedUseSelectorHook, 
    useSelector, 
    useDispatch }               from 'react-redux';

import { Socket, io as socketIOClient } from 'socket.io-client';

import mongoose, { Model } 				from 'mongoose';
import * as MatchMongo 			from '../dbService/models/Match';
import * as TeamMongo           from "../dbService/models/Team";
import FrontendCreateResponse 	from '../models/FrontendCreateResponse';

import Header                   from '../container/Header';
import Footer                   from '../container/Footer';
import Main                     from '../container/Main';
import MatchesBoard             from '../match/components/MatchesBoard';
import { setMatches,
         updateMatches } 	    from '../match/slice/MatchSlice';
import { wrapperMatch }         from '../match/store/MatchStore';
import { MatchesInterface }     from '../match/models/MatchInterface';

import Competition,{ CompetitionSchema, ICompetition } from '../dbService/models/Competition';
import { Team, TeamSchema } from '../dbService/models/Team';


// const matchesUpdate:MatchesInterface = {
// 	"4": {
// 		"competition":
// 		{
// 			"name": "Serie A",
// 			"nation": "italia",
// 			"id": 4,
// 			"matches":
// 			{
// 				"1":
// 				{
// 					"match_id": "1",					
// 					"home_score": "5",
// 					"away_score": "1"					
// 				},
//                 "2": {
// 					"match_id": "2",
// 					"home_team": "Fiorentina",
// 					"away_team": "Sassuolo",
// 					"home_team_img": "/images/flags/italia.png",
// 					"away_team_img": "/images/flags/italia.png",
// 					"time": "13:00",
// 					"home_score": "2",
// 					"away_score": "3",
// 					"first_half_away_score": "1",
// 					"first_half_home_score": "0",
// 					"last_goal": "away",
// 					"status": "ended",
// 					"current_time": "81"
// 				},
// 			}
// 		}
// 	},
//     "5": {
// 		"competition":
// 		{
// 			"name": "Liga ",
// 			"nation": "spain",
// 			"id": 4,
// 			"matches":
// 			{
// 				"6":
// 				{
// 					"match_id": "6",
// 					"home_team": "Real",
// 					"away_team": "Barcellona",					
// 					"time": "13:00",
// 					"home_score": "2",
// 					"away_score": "2",
// 					"first_half_away_score": "1",
// 					"first_half_home_score": "0",
// 					"last_goal": "home",
// 					"status": "live",
// 					"current_time": "65"
// 				}
// 			}
// 		}
// 	}
// };

const connectMongoDB = async () => {
	console.log('Mongoose connected to MongoDB333');
    try {
		const Competition:Model<ICompetition> = mongoose.models.Competition || mongoose.model<ICompetition>('Competition', CompetitionSchema);
		const Team:Model<TeamMongo.ITeam> =mongoose.models.Team || mongoose.model<TeamMongo.ITeam>('Team',TeamSchema);
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
	
		const startOfDay 	= new Date("2023-11-20T00:00:00Z");
		const endOfDay 		= new Date("2023-11-20T23:59:59Z");
		const matches 		= await MatchMongo.Match.find({
			dateMatch: {
				$gte: startOfDay,
				$lte: endOfDay
			}
		}).populate('competitionId').populate('teamHome').populate('teamAway').exec();
		for (let match of matches) {   
            // Processa ogni 'match' come necessario
            frontendCreateResponse.addLiveMatch(match, match._id.toString());
        };
		

		store.dispatch(setMatches(frontendCreateResponse.objResponse));        
		return {
			props: {},
		};
	}
);


function MatchesBoardPage(data:any) {    
    const dispatch = useDispatch();


    const host = 'ws://79.23.219.60:3001';
    const socket: Socket = socketIOClient(host);
    socket.on('connect', () => {
        console.info('Client connesso');
    });
    socket.on('dataLive', (data) => {
        console.info('Client Riceve data' + data);
       // dispatch(updateMatches(data));
    });
    

    return(  
        <>                                                        
            <Header/>            
                <Main MatchBoard={<MatchesBoard/>}/>
            <Footer/>            
        </>
    );
}

export default MatchesBoardPage;