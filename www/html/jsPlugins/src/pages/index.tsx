import React, { useEffect }     from 'react';
import { 
    Provider,
    TypedUseSelectorHook, 
    useSelector, 
    useDispatch }               from 'react-redux';

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

 
const matches:MatchesInterface = {
	"4": {
		"competition":
		{
			"name": "Serie A",
			"nation": "italia",
			"id": 4,
			"matches":
			{
				"1":
				{
					"match_id": "1",
					"home_team": "Milan",
					"away_team": "Inter",
					"home_team_img": "/images/flags/italia.png",
					"away_team_img": "/images/flags/italia.png",
					"time": "13:00",
					"home_score": "2",
					"away_score": "1",
					"first_half_away_score": "1",
					"first_half_home_score": "0",
					"last_goal": "home",
					"status": "live",
					"current_time": "65"
				},
				"2":
				{
					"match_id": "2",
					"home_team": "Fiorentina",
					"away_team": "Sassuolo",
					"home_team_img": "/images/flags/italia.png",
					"away_team_img": "/images/flags/italia.png",
					"time": "13:00",
					"home_score": "1",
					"away_score": "3",
					"first_half_away_score": "1",
					"first_half_home_score": "0",
					"last_goal": "away",
					"status": "ended",
					"current_time": "81"
				},
				"3":
				{
					"match_id": "3",
					"home_team": "Torino",
					"away_team": "Udinese",
					"home_team_img": "/images/flags/italia.png",
					"away_team_img": "/images/flags/italia.png",
					"time": "13:00",
					"home_score": "1",
					"away_score": "3",
					"first_half_away_score": "1",
					"first_half_home_score": "0",
					"last_goal": "away",
					"status": "ended",
					"current_time": "45+2"
				},
				"4":
				{
					"match_id": "4",
					"home_team": "Lazio",
					"away_team": "Roma",
					"home_team_img": "/images/flags/italia.png",
					"away_team_img": "/images/flags/italia.png",
					"time": "13:00",
					"home_score": "1",
					"away_score": "3",
					"first_half_away_score": "1",
					"first_half_home_score": "0",
					"last_goal": "away",
					"status": "live",
					"current_time": "33"
				},
				"5":
				{
					"match_id": "5",
					"home_team": "Juve",
					"away_team": "Napoli",
					"home_team_img": "/images/flags/italia.png",
					"away_team_img": "/images/flags/italia.png",
					"time": "13:00",
					"home_score": "0",
					"away_score": "5",
					"first_half_away_score": "0",
					"first_half_home_score": "3",
					"last_goal": "away",
					"status": "live",
					"current_time": "59"
				}
			}
		}
	},
    "5": {
		"competition":
		{
			"name": "Liga ",
			"nation": "spain",
			"id": 4,
			"matches":
			{
				"6":
				{
					"match_id": "6",
					"home_team": "Real",
					"away_team": "Barcellona",
					"home_team_img": "/images/flags/spain.png",
					"away_team_img": "/images/flags/spain.png",
					"time": "13:00",
					"home_score": "2",
					"away_score": "1",
					"first_half_away_score": "1",
					"first_half_home_score": "0",
					"last_goal": "home",
					"status": "live",
					"current_time": "65"
				},
				"7":
				{
					"match_id": "7",
					"home_team": "Atletico Madrid",
					"away_team": "Sibilla",
					"home_team_img": "/images/flags/spain.png",
					"away_team_img": "/images/flags/spain.png",
					"time": "13:00",
					"home_score": "1",
					"away_score": "3",
					"first_half_away_score": "1",
					"first_half_home_score": "0",
					"last_goal": "away",
					"status": "ended",
					"current_time": "81"
				},
				"8":
				{
					"match_id": "8",
					"home_team": "Deportivo La Coruna",
					"away_team": "Athletic Bilbao",
					"home_team_img": "/images/flags/spain.png",
					"away_team_img": "/images/flags/spain.png",
					"time": "13:00",
					"home_score": "1",
					"away_score": "3",
					"first_half_away_score": "1",
					"first_half_home_score": "0",
					"last_goal": "away",
					"status": "next",
					"current_time": "45+2"
				}
			}
		}
	}
};

const matchesUpdate:MatchesInterface = {
	"4": {
		"competition":
		{
			"name": "Serie A",
			"nation": "italia",
			"id": 4,
			"matches":
			{
				"1":
				{
					"match_id": "1",					
					"home_score": "5",
					"away_score": "1"					
				},
                "2": {
					"match_id": "2",
					"home_team": "Fiorentina",
					"away_team": "Sassuolo",
					"home_team_img": "/images/flags/italia.png",
					"away_team_img": "/images/flags/italia.png",
					"time": "13:00",
					"home_score": "2",
					"away_score": "3",
					"first_half_away_score": "1",
					"first_half_home_score": "0",
					"last_goal": "away",
					"status": "ended",
					"current_time": "81"
				},
			}
		}
	},
    "5": {
		"competition":
		{
			"name": "Liga ",
			"nation": "spain",
			"id": 4,
			"matches":
			{
				"6":
				{
					"match_id": "6",
					"home_team": "Real",
					"away_team": "Barcellona",					
					"time": "13:00",
					"home_score": "2",
					"away_score": "2",
					"first_half_away_score": "1",
					"first_half_home_score": "0",
					"last_goal": "home",
					"status": "live",
					"current_time": "65"
				}
			}
		}
	}
};

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
            frontendCreateResponse.addLiveMatch(match, match._id);
        };
		

		store.dispatch(setMatches(frontendCreateResponse.objResponse));        
		return {
			props: {},
		};
	}
);


function MatchesBoardPage(data:any) {    
    const dispatch = useDispatch();

    setTimeout(() => {
        dispatch(updateMatches(matchesUpdate));    
    },1000);

    return(  
        <>                                                        
            <Header/>            
                <Main MatchBoard={<MatchesBoard/>}/>
            <Footer/>            
        </>
    );
}

export default MatchesBoardPage;