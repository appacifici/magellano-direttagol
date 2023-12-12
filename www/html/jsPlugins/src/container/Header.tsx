import React            from 'react';
import Menu             from './Menu';
import Image            from 'react-bootstrap/Image';
import headerStyle      from '../../scss/header.module.scss';

function Header() {
    return( 
        <>
            <header>
                <div className={headerStyle.topBar}>
                    <Image src="/images/logo2.png" rounded />
                </div>
                <div className={headerStyle.searchBar}></div>
                
                    <Menu/>
                
            </header>
        </>
    );
}
export default Header;