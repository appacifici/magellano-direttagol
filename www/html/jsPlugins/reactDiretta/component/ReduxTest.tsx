import React from 'react';
import Clock from './Clock';
import Ajax from './Ajax';1
import App from './ReduxTest/App';
import { Store } from './ReduxTest/Store';
import { Provider } from 'react-redux';


function ReduxTest() {
    return(
        <>            
            <Provider store={Store}>
                <App/>
            </Provider>            
        </>
    );
}

export default ReduxTest;