import React, {useState}            from 'react';
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

    const changeCalendar = (date:any) => {
        setStartDate(new Date(date));        
        window.location.href = "/?date="+format(date, 'yyyy-MM-dd');
    }

    return( 
        <>                    
            <Container fluid="md" className={`${stlMatchBoard.matchBoard} rounded mt-4`}>
                <DatePicker 
                    dateFormat="yyyy-MM-dd"
                    showIcon 
                    className={`${stlMatchBoard.datePickerMatches}`} 
                    selected={startDate} 
                    onChange={(e:any) => changeCalendar(e)}
                />
                {Object.keys(matches).map( (key:any) => <>
                    <Competition matches={...matches[key]} tabStatusMatch={tabStatusMatch}/>                             
                    </>
                )}
            </Container>
        </> 
    );
}

export default MatchesBoard;