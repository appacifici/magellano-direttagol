import React 				from 'react';
import Container 			from 'react-bootstrap/Container';
import Navbar 				from 'react-bootstrap/Navbar';
import Image 				from 'react-bootstrap/Image';
import Offcanvas 			from 'react-bootstrap/Offcanvas';
import Link         		from 'next/link';
import TopChampionship 		from './TopChampionship';
import Nations 				from './Nations';
import styles 				from '../../../scss/aside.module.scss'; 
 
function AsideList({ nationsCompetitions,competitionsTop }:{nationsCompetitions:any, competitionsTop:any} ) {
	const expand = 'lg';
	
	return (
		<>			 
			<aside>
				<Navbar key={expand} expand={expand} className="position-static">
					<Container fluid>
						<Navbar.Toggle aria-controls={`offcanvasAside-expand-${expand}`} className={styles.navbarToggler} />
						<Navbar.Offcanvas id={`offcanvasAside-expand-${expand}`} aria-labelledby={`offcanvasAsideLabel-expand-${expand}`} placement="start">
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id={`offcanvasAsideLabel-expand-${expand}`}></Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body className={styles.asideOffcanvas}>
								<Link href='/'>
									<Image src="/images/diretta-orizzontale.svg" rounded className={`${styles.logo} d-lg-none`} />									
								</Link>
								<TopChampionship competitionsTop={competitionsTop}/>
								<Nations nationsCompetitions={nationsCompetitions}/>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			</aside>			
		</>
	);
}

export default AsideList;