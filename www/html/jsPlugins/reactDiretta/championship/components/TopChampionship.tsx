import React 		from 'react';
import Container 	from 'react-bootstrap/Container';
import Nav 			from 'react-bootstrap/Nav';
import Navbar 		from 'react-bootstrap/Navbar';
import Image 		from 'react-bootstrap/Image';
import Offcanvas 	from 'react-bootstrap/Offcanvas';
import Row 			from 'react-bootstrap/Row';
import Col 			from 'react-bootstrap/Col';
import '../../scss/aside.scss';

function TopChampionship() {
	return (
		<>			
			<Nav className="pe-1 p-3">
				<Row className="w-100">
					<Col className="mb-2 pb-lg-0 border-lg-0 col-12">
						<h2>TOP CAMPIONATI</h2>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">
						<Image src="/images/flags/italia.png" className="float-start border border-lg-0" />
						<span className="float-start ms-2">Serie A</span>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">
						<Image src="/images/flags/spain.png" className="float-start border border-lg-0" />
						<span className="float-start ms-2">Liga</span>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">
						<Image src="/images/flags/france.png" className="float-start border border-lg-0" />
						<span className="float-start ms-2">Ligue 1</span>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">
						<Image src="/images/flags/germany.png" className="float-start border border-lg-0" />
						<span className="float-start ms-2">Bundesliga</span>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">
						<Image src="/images/flags/england.png" className="float-start border border-lg-0" />
						<span className="float-start ms-2">Premier League</span>
					</Col>
				</Row>
			</Nav>							
		</>
	);
}

export default TopChampionship;