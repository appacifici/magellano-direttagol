import React            from 'react';
import { Provider }     from 'react-redux';
import Menu             from './Menu';
import Image            from 'react-bootstrap/Image';
import headerStyle      from '../../scss/header.module.scss';
import { Store }        from '../match/Store/Store';

function Header() {
    return( 
        <>
            <header>
                <div className={headerStyle.topBar}>
                    <Image src="/images/logo2.png" rounded />
                </div>
                <div className={headerStyle.searchBar}></div>
                <Provider store={Store}>
                    <Menu/>
                </Provider>
            </header>
        </>
    );
}
export default Header;