import React                    from 'react';
import Row				        from 'react-bootstrap/Row';
import Col				        from 'react-bootstrap/Col';
import Image				    from 'react-bootstrap/Image';
import { useEffect }            from 'react';
import { useDispatch } 			from 'react-redux';
import stlMatchBoard            from '../../../scss/matchBoard.module.scss';
import { MatchInterface }       from '../models/MatchInterface';
import { addFollowMatch, 
    removeFollowMatch, 
    FollowMatchState, 
    setNewGoalMatch, 
    UpdateMatchStateKeys } 	    from '../../match/slice/MatchSlice';

const getStatus = (status:string, time:string, currentTime:string, minuteSymbol:string ):string => {
    let matchStatus:string = '';

    switch( status ) {
        case 'live':
            matchStatus = currentTime+minuteSymbol;
        break;
        case 'next':
            const date: Date = new Date();    
            const [hours, minutes]: string[] = currentTime.split(':');
            date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
            date.setHours(date.getHours() + 1);
            matchStatus = date.getHours()+':'+date.getMinutes().toString().padStart(2, '0');
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
    const dispatch  = useDispatch();    
    useEffect(() => {        
        setInitialFollow();                    
    });
    
    const newGoalClass = (newGoal:boolean):string => {    
        if( newGoal ) {
            const timeoutId = setTimeout(() => {
                const matchState:UpdateMatchStateKeys = {competitionId:competitionId, matchId:match.keyMatch};

                dispatch(setNewGoalMatch(matchState));
                clearTimeout(timeoutId);
            }, 30000);
        }

        const newGoalClass = newGoal === true ? stlMatchBoard.newGoal : '';
        const rowClasses = `${stlMatchBoard.match} ${newGoalClass}`;
        return rowClasses;
    }
    


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
            if( followedMatches === undefined ) {
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
        if( score !== undefined  && score !== '' && status !== 'next' ) {
            return <>({score})</>
        }
        return <></>;
    }

    const getColProps = (className:string, status:string):object => {        
        let xs = 2;
        let md = 1;
      
        switch (match.status) {
          case 'live':
            className += ` ${stlMatchBoard.liveMatch}`;
            break;
          case 'added_time':
            className += ` ${stlMatchBoard.liveMatch}`;
            break;
          case 'interval':
            className += ` ${stlMatchBoard.liveMatch}`;
            break;
          default:
            break;
        }
      
        return { className, xs, md };
    }
    
    return( 
        <>            
            <Row className={newGoalClass(match.newGoal)} key={match.match_id} data-id={match.match_id}>                
                <Col xs={1} md={1} className='p-0 p-sm-2'>
                    <span className='pt-2'>
                        <i className={getMatchIsFollowed(match.keyMatch)} id={match.keyMatch} onClick={manageClickFollow}></i>{match.follow}
                    </span>
                </Col>                
                <Col {...getColProps("pt-2 text-center p-0 p-sm-2",match.status)} >
                    {getStatus(match.status, match.time, match.current_time, '`')}
                </Col>                
                <Col xs={7} md={8} className='text-left'>
                    <Row>
                        <Col xs={2} md={1} className='p-0'>
                            <Image src={"/images/flags/"+match.home_team_img+".svg"} className="float-start border border-lg-0" />
                        </Col>
                        <Col xs={10} md={11}>{match.home_team}</Col>                            
                    </Row>   
                    <Row>
                        <Col xs={2} md={1} className='p-0'>
                        <Image src={"/images/flags/"+match.away_team_img+".svg"} className="float-start border border-lg-0" />
                        </Col>
                        <Col xs={10} md={11}>{match.away_team}</Col>                          
                    </Row>   
                </Col>
                <Col xs={2} md={1}>
                    <Row>                                                    
                        <Col {...getColProps("position-relative",match.status)}>
                            {match.last_goal === 'home' && <div className={stlMatchBoard.lastGoal}></div>}
                            {match.status !== 'next' && match.home_score}
                        </Col>                            
                        <Col className={stlMatchBoard.scoreHT} xs={6} md={6}>{getHalfTimeScore(match.first_half_away_score,match.status)}</Col>                            
                    </Row>    
                    <Row>                            
                    <Col {...getColProps("position-relative",match.status)}>
                            {match.last_goal === 'away' && <div className={stlMatchBoard.lastGoal}></div>}
                            {match.status !== 'next' && match.away_score}
                        </Col>
                        <Col className={stlMatchBoard.scoreHT} xs={6} md={6}>{getHalfTimeScore(match.first_half_home_score,match.status)}</Col>                            
                    </Row>    
                </Col>                                             
            </Row>
        </>
    );
}

export default MatchBoard;