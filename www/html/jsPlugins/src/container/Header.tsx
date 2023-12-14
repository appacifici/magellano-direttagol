import React            from 'react';
import Menu             from './Menu';
import Image            from 'react-bootstrap/Image';
import Link         	from 'next/link';
import headerStyle      from '../../scss/header.module.scss';

function Header() {
    return( 
        <>
            <header>
                <div className={headerStyle.topBar}>
                    <Link href='/'>
                        <Image src="/images/logodirettagol.png" rounded />
                    </Link>
                </div>
                <div className={headerStyle.searchBar}></div>                
                <Menu/>                
            </header>
        </>
    );
}
export default Header;