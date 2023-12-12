import React                            from 'react';
import * as CountryMongo                from '../../../dbService/models/Country';
import * as StandingMongo               from '../../../dbService/models/Standing';

import Header                           from '../../../container/Header';
import Footer                           from '../../../container/Footer';
import MainStanding                     from '../../../container/MainStanding';
import MatchesBoard                     from '../../../match/components/MatchesBoard';

import { wrapperMatch }                 from '../../../match/store/MatchStore';


import Competition, {CompetitionType}                     from '../../../dbService/models/Competition';

import { connectMongoDB, initData, InitDataReturnType, currentDate }          from '../../../services/globalNext';

export const getServerSideProps = wrapperMatch.getServerSideProps(
    (store) => async (context) => {     	        
        const { date, country, league }     = context.query;

        await connectMongoDB();        
        
        const scountry               = Array.isArray(country) ? country[0] : country;        
        const sleague                = Array.isArray(league) ? league[0] : league;       
        
        const countryMongo           = await CountryMongo.Country.findOne({ permalink:scountry }).lean().exec();        
        const competition:CompetitionType            = await Competition.findOne({ permalink:sleague, countryId:countryMongo }).exec();
        const dateMatches            = date !== undefined ? date : currentDate();
                
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
    return(  
        <>                                                        
            <Header/>                                        
                <MainStanding standings={data.standings} nationsCompetitions={data.nationsCompetitions} competitionsTop={data.competitionsTop} MatchBoard={<MatchesBoard/>}/>
            <Footer/>            
        </>
    );
}

export default MatchesBoardPage;