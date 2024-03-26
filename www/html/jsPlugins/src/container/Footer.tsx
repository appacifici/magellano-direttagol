import React from 'react';
import { Container } from 'react-bootstrap';

import styles 				from '../../scss/footer.module.scss'; 

function Footer() {
    return( 
        <>            
            <footer className={styles.footer}>
                <Container className={styles.footertext}>
                    Copyright ©️ {new Date().getFullYear()} direttagol.it di proprietà di Magellano Tech Solutions Srl - Palazzo Valadier - Piazza del Popolo, 18 - 00187 Roma RM <a href="mailto:info@magellanotech.it">info@magellanotech.it</a>
                </Container>
            </footer>         
        </>
    );
}

export default Footer;