import React 			from 'react';
import Nav 				from 'react-bootstrap/Nav';
import Row 				from 'react-bootstrap/Row';
import Col 				from 'react-bootstrap/Col';
import Championships 	from './Championships';
import '../../scss/aside.scss';

function Nations() {
	return (
		<>		
			<Nav className="flex-grow-1 pe-1 p-3">
				<Row className="w-100">
					<Col className="mb-2 pb-lg-0 border-lg-0 col-12">
						<h2>NAZIONI</h2>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">											
						<Championships nation="Italia"/>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">
						<Championships nation="Spagna"/>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">
						<Championships nation="Francia"/>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">
						<Championships nation="Germania"/>
					</Col>
					<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">
						<Championships nation="Inghilterra"/>
					</Col>
				</Row>
			</Nav>
		</>
	);
}

export default Nations;