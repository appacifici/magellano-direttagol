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
    
    const [minuteSymbol, setMinuteSymbol] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {         
            if( minuteSymbol == "'" ) {
                setMinuteSymbol("");
            } else {
                setMinuteSymbol("'");
            }            
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [minuteSymbol]);

    const manageClick: React.MouseEventHandler<HTMLElement> = (event):void => {
        event.preventDefault();
        const followState:FollowMatchState = {competitionId:competitionId, matchId:event.currentTarget.id};

        if( event.currentTarget.getAttribute('follow') === 'true' ) {
            event.currentTarget.setAttribute('follow', 'false');
            event.currentTarget.className = `bi bi-star ${stlMatchBoard.biStar}`;            
            dispatch( removeFollowMatch(followState) );
        } else {
            event.currentTarget.setAttribute('follow', 'true');
            event.currentTarget.className = `bi bi-star-fill ${stlMatchBoard.biStar}`;
            dispatch( addFollowMatch(followState) );
        }                        
    }

    const getHalfTimeScore = (score:string|void) => {        
        if( score != undefined  && score != '' ) {
            return <>({score})</>
        }
        return <></>;
    }
    
    return( 
        <>            
            <Row className={stlMatchBoard.match} key={match.match_id} data-id={match.match_id}>                
                <Col xs={1} md={1}>
                    <span className='pt-2'>
                        <i className={`bi bi-star ${stlMatchBoard.biStar}`} id={match.keyMatch} onClick={manageClick}></i>
                    </span>
                </Col>                
                <Col className={"pt-2 text-center "+ (match.status == 'live' ? stlMatchBoard.liveMatch : '')} xs={2} md={1}>
                    {getStatus(match.status, match.time, match.current_time, minuteSymbol)}
                </Col>                
                <Col xs={6} md={8} className='text-left'>
                    <Row>
                        <Col xs={2} md={1} className='p-0'>
                            <Image src={"/images/flags/"+nation+".png"} className="float-start border border-lg-0" />
                        </Col>
                        <Col xs={10} md={11}>{match.home_team}</Col>                            
                    </Row>   
                    <Row>
                        <Col xs={2} md={1} className='p-0'>
                        <Image src={"/images/flags/"+nation+".png"} className="float-start border border-lg-0" />
                        </Col>
                        <Col xs={10} md={11}>{match.away_team}</Col>                          
                    </Row>   
                </Col>
                <Col xs={2} md={1}>
                    <Row>                            
                        <Col xs={6} md={6} className={"position-relative "+ (match.status == 'live' ? stlMatchBoard.liveMatch : '')}>
                            {match.last_goal == 'home' && <div className={stlMatchBoard.lastGoal}></div>}
                            {match.home_score}
                        </Col>                            
                        <Col xs={6} md={6}>{getHalfTimeScore(match.first_half_away_score)}</Col>                            
                    </Row>    
                    <Row>                            
                        <Col xs={6} md={6} className={"position-relative "+ (match.status == 'live' ? stlMatchBoard.liveMatch : '')}>
                            {match.last_goal == 'away' && <div className={stlMatchBoard.lastGoal}></div>}
                            {match.away_score}
                        </Col>
                        <Col xs={6} md={6}>{getHalfTimeScore(match.first_half_home_score)}</Col>                            
                    </Row>    
                </Col>                                             
            </Row>
        </>
    );
}

export default MatchBoard;
