import React from 'react';
import Clock from './Clock';
import Ajax from './Ajax';

const happy = <h2>suca</h2>;

function Prove() {
    return(
        <>
            {/* <div className='App'>
                prova {happy} {4*8}
            </div> */}
            {/* <Clock country="ITALY" timezone={2}/>             */}
            <Ajax/>
        </>
    );
}

export default Prove;