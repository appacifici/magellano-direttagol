import React, {useEffect, useState}            from 'react';
import { 
    TypedUseSelectorHook, 
    useSelector }       from 'react-redux';
import { useRouter } from 'next/router';

import Container        from 'react-bootstrap/Container';

import Competition      from './Competition';
import stlMatchBoard    from '../../../scss/matchBoard.module.scss';
import { MatchesInterface } from '../models/MatchInterface';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from 'date-fns/format';
import moment from 'moment';

const MatchesBoard = () => {        
    const useTypedSelector: TypedUseSelectorHook<any> = useSelector;
    const router = useRouter();
    const date = router.query.date
    const dateInit =  date != undefined ? date : moment().format('YYYY-MM-DD');
    let tabStatusMatch      = useTypedSelector( state => state.tabMatch.tab ); //riceve lo stato dallo store    
    let matches             = useTypedSelector( state => state.matches ); //riceve lo stato dallo store
    const [startDate, setStartDate] = useState(new Date(`${dateInit}T00:00:00Z`));

    const [hasMatchesInAnyCompetition, setHasMatchesInAnyCompetition] = useState(false);
    useEffect(() => {
        checkForMatches(matches,tabStatusMatch);
    }, [matches, tabStatusMatch]);

    const changeCalendar = (date:any) => {
        setStartDate(new Date(date));        
        window.location.href = "/?date="+format(date, 'yyyy-MM-dd');
    }

    const getMatchesComponent = (matches:any) => {
        console.log(matches);
        if( matches != null ) {
            return <>
                {Object.keys(matches).map( (key:any) => <>
                    <Competition matches={...matches[key]} tabStatusMatch={tabStatusMatch}/>                             
                    </>
                )}
            </>;
        } else {
            return (<></>);
        }
    }

    const checkForMatches = (matches:any) => {
        let hasMatch = false;
        Object.keys(matches).forEach((key) => {            
            Object.keys(matches[key].competition.matches).forEach((key2) => {                
                const match = matches[key].competition.matches[key2];                
                if (match.status === tabStatusMatch || tabStatusMatch === 'all' || (match.follow === true && tabStatusMatch === 'follow')) {
                    hasMatch = true;
                }
            });
        });
    
        setHasMatchesInAnyCompetition(hasMatch);
    };

    return( <>      
        {hasMatchesInAnyCompetition ? (
            <>
                <Container fluid="md" className={`${stlMatchBoard.matchBoard} rounded mt-4`}>
                    <DatePicker 
                        dateFormat="yyyy-MM-dd"
                        showIcon 
                        className={`${stlMatchBoard.datePickerMatches}`} 
                        selected={startDate} 
                        onChange={(e:any) => changeCalendar(e)}
                    />
                    {getMatchesComponent(matches)}
                </Container>
            </>
        ) : (
            <Container fluid="md" className={`${stlMatchBoard.matchBoard} rounded mt-4`}>
                    <DatePicker 
                        dateFormat="yyyy-MM-dd"
                        showIcon 
                        className={`${stlMatchBoard.datePickerMatches}`} 
                        selected={startDate} 
                        onChange={(e:any) => changeCalendar(e)}
                    />
                    <div className={`${stlMatchBoard.noMatchResult}`}>Non ci sono partite</div>                    
                </Container>
        )}                              
    </>); 

}

export default MatchesBoard;