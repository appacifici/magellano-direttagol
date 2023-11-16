import React            from 'react';
import { 
    TypedUseSelectorHook, 
    useSelector }       from 'react-redux';
import Container        from 'react-bootstrap/Container';

import Competition      from './Competition';
import stlMatchBoard    from '../../../scss/matchBoard.module.scss';
import { MatchesInterface } from '../models/matchInterface';

const MatchesBoard = () => {        
    const useTypedSelector: TypedUseSelectorHook<any> = useSelector;
    
    let tabStatusMatch      = useTypedSelector( state => state.tabMatch ); //riceve lo stato dallo store    
    let matches             = useTypedSelector( state => state.matches ); //riceve lo stato dallo store
    console.log(matches);

    return( 
        <>                    
            <Container fluid="md" className={`${stlMatchBoard.matchBoard} rounded mt-4`}>
                {Object.keys(matches).map( (key:any) =>
                    <Competition matches={...matches[key]} tabStatusMatch={tabStatusMatch}/>                             
                )}
            </Container>
        </> 
    );
}

export default MatchesBoard;