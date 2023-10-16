import React            from 'react';
import { Provider }     from 'react-redux';
import Menu             from './Menu';
import Image            from 'react-bootstrap/Image';
import '../scss/header.scss';
import { Store }        from '../match/Store/Store';

function Header() {
    return( 
        <>
            <header>
                <div className="topBar">
                    <Image src="/images/logo2.png" rounded />
                </div>
                <div className="searchBar"></div>
                <Provider store={Store}>
                    <Menu/>
                </Provider>
            </header>
        </>
    );
}
export default Header;