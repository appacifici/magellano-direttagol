import React 		from 'react';
import Nav 			from 'react-bootstrap/Nav';
import Row 			from 'react-bootstrap/Row';
import Accordion 	from 'react-bootstrap/Accordion';

function Championships( props:any ) {
	return (
		<>			
			<Accordion>
				<Accordion.Item eventKey="0">
				<Accordion.Header>{props.nation}</Accordion.Header>
				<Accordion.Body>
					<Nav>
						<Row className="w-100">								
							<h3 className="float-start ms-2">Serie A</h3>
							<h3 className="float-start ms-2">Serie B</h3>
							<h3 className="float-start ms-2">Serie C</h3>
						</Row>
					</Nav>
				</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</>
	);
}

export default Championships;