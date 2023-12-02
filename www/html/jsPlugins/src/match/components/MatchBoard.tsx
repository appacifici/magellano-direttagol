import React                    from 'react';
import Row				        from 'react-bootstrap/Row';
import Col				        from 'react-bootstrap/Col';
import Image				    from 'react-bootstrap/Image';
import { useState, useEffect }  from 'react';
import { 
	useDispatch, 
	TypedUseSelectorHook, 
	useSelector } 			    from 'react-redux';
import stlMatchBoard            from '../../../scss/matchBoard.module.scss';
import { MatchInterface }       from '../models/MatchInterface';
import { addFollowMatch, 
    removeFollowMatch, FollowMatchState } 	    from '../../match/slice/MatchSlice';
import { clickTabMatch } from '../slice/TabMatchSlice';

const getStatus = (status:string, time:string, currentTime:string, minuteSymbol:string ):string => {
    let matchStatus:string = '';

    switch( status ) {
        case 'live':
            matchStatus = currentTime+minuteSymbol;
        break;
        case 'next':
            matchStatus = time;
        break;
        case 'ended':
            matchStatus = 'Finale';
        break;
        case 'interval':
            matchStatus = "Intervallo";
        break;
        case "added_time":
            matchStatus = "Recupero";
        break;
    }
    return matchStatus;
}

const MatchBoard = ({match,competitionId,nation}:{match:MatchInterface,competitionId:string, nation:string}) => {
    const dispatch = useDispatch();
    const useTypedSelector: TypedUseSelectorHook<any> = useSelector;
    let matches      = useTypedSelector( state => state.matches.tab ); //riceve lo stato dallo store   

    const [stateGetFollowed, setStateGetFollowed]   = useState('');
    const [minuteSymbol, setMinuteSymbol]           = useState('');

    useEffect(() => {
        const interval = setInterval(() => {         
            if( minuteSymbol == "'" ) {
                //setMinuteSymbol("");
            } else {
                //setMinuteSymbol("'");
            }            
        }, 1000);
        setInitialFollow();     
        
        return () => {
            clearInterval(interval);
        };
    }, [minuteSymbol]);

    //Gestisce i match seguiti iniziali dell'utente salvati nel local storage e li setta nello store
    const setInitialFollow = () => {
        let followedMatches = localStorage.getItem('followMatches');
        let array = JSON.parse(followedMatches);
        if( array !== null ) {                    
            array.forEach((item:FollowMatchState) => {            
                let followState = {competitionId:item.competitionId, matchId:item.matchId};
                dispatch( addFollowMatch(followState) );
            });        
        }
    }

    //Gestisce i match seguiti inserendoli e rimuovendoli dal local storare e dallo store
    const manageClickFollow: React.MouseEventHandler<HTMLElement> = (event):void => {
        event.preventDefault();
        const followState:FollowMatchState = {competitionId:competitionId, matchId:event.currentTarget.id};

        if( event.currentTarget.getAttribute('follow') === 'true' ) {
            event.currentTarget.setAttribute('follow', 'false');
            event.currentTarget.className = `bi bi-star ${stlMatchBoard.biStar}`;            
            dispatch( removeFollowMatch(followState) );

            let followedMatches = localStorage.getItem('followMatches');
            let array = JSON.parse(followedMatches);
            array = array.filter((item:FollowMatchState) => !(item.competitionId === followState.competitionId && item.matchId === followState.matchId));
            let updatedJsonString = JSON.stringify(array);
            localStorage.setItem('followMatches', updatedJsonString);

        } else {
            event.currentTarget.setAttribute('follow', 'true');
            event.currentTarget.className = `bi bi-star-fill ${stlMatchBoard.biStar}`;
            dispatch( addFollowMatch(followState) );

            let followedMatches = localStorage.getItem('followMatches');
            if( followedMatches == undefined ) {
                followedMatches = `[${JSON.stringify(followState)}]`;
                localStorage.setItem('followMatches', followedMatches);
            } else {
                let array = JSON.parse(followedMatches);
                array.push(followState);
                let updatedJsonString = JSON.stringify(array);
                localStorage.setItem('followMatches', updatedJsonString);
            }            
        }                        
    }

    //Determina se deve mettere la stella vuota o piena
    const getMatchIsFollowed = (matchId:string):string => {          
        if (typeof window !== "undefined") {
            let followedMatches = localStorage.getItem('followMatches');
            let array = JSON.parse(followedMatches);
            if( array == null ) {
                return `bi bi-star ${stlMatchBoard.biStar}`;
            }

            if( array.some((item:FollowMatchState) => { 
                return item.matchId === matchId 
            }) ) {                
                return `bi bi-star-fill ${stlMatchBoard.biStar}`;
            }            
            return `bi bi-star ${stlMatchBoard.biStar}`;
        }        
        return `bi bi-star ${stlMatchBoard.biStar}`;
    }

    const getHalfTimeScore = (score:string|void,status:string) => {        
        if( score != undefined  && score != '' && status != 'next' ) {
            return <>({score})</>
        }
        return <></>;
    }
    
    return( 
        <>            
            <Row className={stlMatchBoard.match} key={match.match_id} data-id={match.match_id}>                
                <Col xs={1} md={1}>
                    <span className='pt-2'>
                        <i className={getMatchIsFollowed(match.keyMatch)} id={match.keyMatch} onClick={manageClickFollow}></i>{match.follow}
                    </span>
                </Col>                
                <Col className={"pt-2 text-center "+ (match.status == 'live' ? stlMatchBoard.liveMatch : '')} xs={2} md={1}>
                    {getStatus(match.status, match.time, match.current_time, minuteSymbol)}
                </Col>                
                <Col xs={6} md={8} className='text-left'>
                    <Row>
                        <Col xs={2} md={1} className='p-0'>
                            <Image src={"/images/flags/"+nation+".svg"} className="float-start border border-lg-0" />
                        </Col>
                        <Col xs={10} md={11}>{match.home_team}</Col>                            
                    </Row>   
                    <Row>
                        <Col xs={2} md={1} className='p-0'>
                        <Image src={"/images/flags/"+nation+".svg"} className="float-start border border-lg-0" />
                        </Col>
                        <Col xs={10} md={11}>{match.away_team}</Col>                          
                    </Row>   
                </Col>
                <Col xs={2} md={1}>
                    <Row>                            
                        <Col xs={6} md={6} className={"position-relative "+ (match.status == 'live' ? stlMatchBoard.liveMatch : '')}>
                            {match.last_goal == 'home' && <div className={stlMatchBoard.lastGoal}></div>}
                            {match.status != 'next' && match.home_score}
                        </Col>                            
                        <Col xs={6} md={6}>{getHalfTimeScore(match.first_half_away_score,match.status)}</Col>                            
                    </Row>    
                    <Row>                            
                        <Col xs={6} md={6} className={"position-relative "+ (match.status == 'live' ? stlMatchBoard.liveMatch : '')}>
                            {match.last_goal == 'away' && <div className={stlMatchBoard.lastGoal}></div>}
                            {match.status != 'next' && match.away_score}
                        </Col>
                        <Col xs={6} md={6}>{getHalfTimeScore(match.first_half_home_score,match.status)}</Col>                            
                    </Row>    
                </Col>                                             
            </Row>
        </>
    );
}

export default MatchBoard;