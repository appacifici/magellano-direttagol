import React, { useContext }            from 'react';
import { useDispatch }                  from 'react-redux';
import { Socket, io as socketIOClient } from 'socket.io-client';
import { useRouter }                    from 'next/router';

import mongoose, { Model } 				from 'mongoose';
import * as MatchMongo 			        from '../../../dbService/models/Match';
import * as TeamMongo                   from "../../../dbService/models/Team";
import * as CountryMongo                from '../../../dbService/models/Country';
import * as StandingMongo               from '../../../dbService/models/Standing';
import FrontendCreateResponse 	        from '../../../models/FrontendCreateResponse';

import Header                           from '../../../container/Header';
import Footer                           from '../../../container/Footer';
import MainStanding                     from '../../../container/MainStanding';
import MatchesBoard                     from '../../../match/components/MatchesBoard';
import { setMatches,
         updateMatches } 	            from '../../../match/slice/MatchSlice';
import { wrapperMatch }                 from '../../../match/store/MatchStore';
import { MatchesInterface }             from '../../../match/models/MatchInterface';

import Competition,
{ CompetitionSchema, ICompetition, CompetitionWithIdType }     from '../../../dbService/models/Competition';
import { Team, TeamSchema }             from '../../../dbService/models/Team';

import StandingTable                    from '../../../standing/components/standing';
import { connectMongoDB, connectSocket, getMenuCompetitions, initData, InitDataReturnType }          from '../../../services/global';

export const getServerSideProps = wrapperMatch.getServerSideProps(
    (store) => async (context) => {     	        
        const { date, country, league }     = context.query;

        await connectMongoDB();        
        
        const scountry               = Array.isArray(country) ? country[0] : country;        
        const sleague                = Array.isArray(league) ? league[0] : league;       
        
        //TODO: fixa questa query
        console.log(scountry);
        // const competition2            = await Competition.aggregate([
        //     {
        //       $lookup: {
        //         from: 'Country', // The name of the collection you're joining with
        //         localField: 'countryId', // The field in the Player model
        //         foreignField: '_id', // The field in the Team model
        //         as: 'country',
        //       },
        //     },
        //     {
        //       $match: {
        //         'country.permalink': scountry, // Filter based on the joined field
        //       },
        //     },
        // ]).exec();

        const competition            = await Competition.findOne({ externalId:1 }).populate({
            path: 'countryId',
            match: { permalink: scountry },
            model: 'Country',
        }).lean().exec();
        console.log(competition);

        const dateMatches            = date != undefined ? date : '2023-12-08';
                
        let nationsCompetitions:any  = {};
        let dataStandings:StandingMongo.StandingArrayWithIdType;
        let standings:StandingMongo.StandingArrayWithIdType
        try {
            dataStandings = await StandingMongo.Standing.find({ competitionId: competition.externalId }).sort({ rank: 1 }).lean().exec();    
            standings = dataStandings.map(doc => ({
                ...doc,
                _id: doc._id.toString(), // Converti ObjectId in stringa
            }));        
        } catch (error) {
            console.error("Errore durante la query:", error);
        }                
		
		const data:InitDataReturnType = await initData(store, dateMatches, competition );
        
		return {
			props: {
                'nationsCompetitions':  data.nationsCompetitions,
                'competitionsTop':      data.competitionsTop,
                'standings':            standings,
            },
		};
	}
);


function MatchesBoardPage(data:any) {    
    //connectSocket();

    return(  
        <>                                                        
            <Header/>                                        
                <MainStanding standings={data.standings} nationsCompetitions={data.nationsCompetitions} competitionsTop={data.competitionsTop} MatchBoard={<MatchesBoard/>}/>
            <Footer/>            
        </>
    );
}

export default MatchesBoardPage;