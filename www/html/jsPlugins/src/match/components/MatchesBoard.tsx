import stlMatchBoard    from '../../../scss/matchBoard.module.scss';
import React            from 'react';
import { 
    Provider,
    TypedUseSelectorHook, 
    useSelector, 
    useDispatch }       from 'react-redux';
import Container        from 'react-bootstrap/Container';
import Row				from 'react-bootstrap/Row';
import Col				from 'react-bootstrap/Col';
import Image		    from 'react-bootstrap/Image';
import MatchBoard       from './MatchBoard';

function MatchesBoard() {    
    const matches = [
        {
            "competition": {
             "name": "Serie A",
             "nation": "italia",
             "id": 4,
             "data": [{
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
            }]
           }
        },
        {
            "competition": {            
            "name": "Liga",
            "nation": "spain",
            "id": 4,
            "data": [{
                "match_id": "6",
                "home_team": "Real Madrid",
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
                "current_time": "49"
              },
            {
                "match_id": "7",
                "home_team": "Siviglia",
                "away_team": "Atletico Madrid",
                "home_team_img": "/images/flags/spain.png",
                "away_team_img": "/images/flags/spain.png",
                "time": "13:00",
                "home_score": "1",
                "away_score": "3",
                "first_half_away_score": "1",
                "first_half_home_score": "0",
                "last_goal": "away",
                "status": "live",
                "current_time": "75"
            },
            {
                "match_id": "8",
                "home_team": "Juve",
                "away_team": "Napoli",
                "home_team_img": "/images/flags/spain.png",
                "away_team_img": "/images/flags/spain.png",
                "time": "13:00",
                "home_score": "0",
                "away_score": "5",
                "first_half_away_score": "0",
                "first_half_home_score": "3",
                "last_goal": "away",
                "status": "next",
                "current_time": "90"
            }]
           }
        },
        {
            "competition": {
             "name": "Liga",
             "nation": "england",
             "id": 4,
             "data": [{
                "match_id": "9",
                "home_team": "Manchester United",
                "away_team": "Totthenam",
                "home_team_img": "/images/flags/england.png",
                "away_team_img": "/images/flags/england.png",
                "time": "13:00",
                "home_score": "2",
                "away_score": "1",
                "first_half_away_score": "1",
                "first_half_home_score": "0",
                "last_goal": "home",
                "status": "live",
                "current_time": "23"
              },
            {
                "match_id": "10",
                "home_team": "Chelsea",
                "away_team": "Arsenal",
                "home_team_img": "/images/flags/england.png",
                "away_team_img": "/images/flags/england.png",
                "time": "13:00",
                "home_score": "1",
                "away_score": "3",
                "first_half_away_score": "1",
                "first_half_home_score": "0",
                "last_goal": "away",
                "status": "next",
                "current_time": "55"
            },
            {
                "match_id": "11",
                "home_team": "West Ham",
                "away_team": "Fulham",
                "home_team_img": "/images/flags/england.png",
                "away_team_img": "/images/flags/england.png",
                "time": "13:00",
                "home_score": "0",
                "away_score": "5",
                "first_half_away_score": "0",
                "first_half_home_score": "3",
                "last_goal": "away",
                "status": "next",
                "current_time": "15"
            }]
           }
        },
    ];

    const useTypedSelector: TypedUseSelectorHook<any> = useSelector;
    const tabStatusMatch     = useTypedSelector( state => state.tabMatch ); //riceve lo stato dallo store
        
    const getMatches = ( matches:any ) => {
        return matches.map( (match: any) => <>                
            {(match.status == tabStatusMatch || tabStatusMatch == 'all' ) && <MatchBoard key={match.match_id} match={match}/>}
        </> );
    }

    return( 
        <>                    
            <Container fluid="md" className={`${stlMatchBoard.matchBoard} rounded mt-4`}>
                {
                    matches.map( match => <>
                        <Row key={match.competition.id} className={`${stlMatchBoard.championship}`}>
                            <Col xs={1} md={1}><i className={`bi bi-star ${stlMatchBoard.biStar}`}></i></Col>
                            <Col xs={10} className='text-center mt-1'>
                                <Image src={"/images/flags/"+match.competition.nation+".png"}/>
                                {match.competition.name}
                            </Col>
                        </Row>
                        {getMatches(match.competition.data)}                                                        
                    </>)
                }                                               
            </Container>
        </> 
    );
}

export default MatchesBoard;