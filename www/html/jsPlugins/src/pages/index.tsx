import React            from 'react';
import { Provider }     from 'react-redux';
import Header           from '../container/Header';
import Footer           from '../container/Footer';
import Main             from '../container/Main';
import MatchesBoard     from '../match/components/MatchesBoard';
import { Store }        from '../match/Store/Store';

function MatchesBoardPage() {
    return(  
        <>                                  
            <Header/>
            <Provider store={Store}>
                <Main MatchBoard={<MatchesBoard/>}/>                         
            </Provider>
            <Footer/>
        </>
    );
}

export default MatchesBoardPage;