import React                    from 'react';
import Row				        from 'react-bootstrap/Row';
import Col				        from 'react-bootstrap/Col';
import Image				    from 'react-bootstrap/Image';
import { useState, useEffect }  from 'react';
import '../../scss/matchBoard.scss';


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
    }

    return matchStatus;
}


const MatchBoard = ({match}:{match:any}) => {
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

    return( 
        <>            
            <Row className='match'>                
                <Col xs={1} md={1}>
                    <span className='pt-2'>
                        <i className="bi bi-star"></i>
                    </span>
                </Col>                
                <Col className={"pt-2 text-center "+ match.status} xs={2} md={1}>{getStatus(match.status, match.time, match.current_time, minuteSymbol)}</Col>                
                <Col xs={6} md={8} className='text-left'>
                    <Row>
                        <Col xs={2} md={1} className='p-0'>
                            <Image src={match.home_team_img} className="float-start border border-lg-0" />
                        </Col>
                        <Col xs={10} md={11}>{match.home_team}</Col>                            
                    </Row>   
                    <Row>
                        <Col xs={2} md={1} className='p-0'>
                        <Image src={match.away_team_img} className="float-start border border-lg-0" />
                        </Col>
                        <Col xs={10} md={11}>{match.away_team}</Col>                          
                    </Row>   
                </Col>                 
                <Col xs={2} md={1}>
                    <Row>                            
                        <Col xs={6} md={6} className={"position-relative "+ match.status}>
                            {match.last_goal == 'home' && <div className="lastGoal"></div>}
                            {match.home_score}
                        </Col>                            
                        <Col xs={6} md={6}>({match.first_half_away_score})</Col>                            
                    </Row>    
                    <Row>                            
                        <Col xs={6} md={6} className={"position-relative "+ match.status}>
                            {match.last_goal == 'away' && <div className="lastGoal"></div>}
                            {match.away_score}
                        </Col>
                        <Col xs={6} md={6}>({match.first_half_home_score})</Col>                            
                    </Row>    
                </Col>                                             
            </Row>
        </>
    );
}

export default MatchBoard;
