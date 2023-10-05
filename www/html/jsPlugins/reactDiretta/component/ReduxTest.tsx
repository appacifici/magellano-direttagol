import React from 'react';
import Clock from './Clock';
import Ajax from './Ajax';1
import TestMatch from './ReduxTest/TestMatch';
// import App from './ReduxTest/App';
//import { Store } from './ReduxTest/Store';

import App from './ReduxToolkit/App';
import { Store } from '../app/store';
import { Provider } from 'react-redux';


function ReduxTest() {
    return( 
        <>            
            <Provider store={Store}>
                <App/>                
            </Provider>       

            {/* <Provider store={Store}>
                <TestMatch/>
            </Provider>             */}
        </>
    );
}

export default ReduxTest;