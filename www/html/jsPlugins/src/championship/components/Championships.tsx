import React 		from 'react';
import Nav 			from 'react-bootstrap/Nav';
import Row 			from 'react-bootstrap/Row';
import Accordion 	from 'react-bootstrap/Accordion';

interface Competition {
    name: string;
    // ... any other properties of a competition
}

interface CountryData {
    country: {
        id: string;
        name: string;
        competitions: { [key: string]: Competition };
    };
}

interface NationsCompetitions {
    [key: string]: CountryData;
}

interface ChampionshipsProps {
    nation: string;
    competitions: { [key: string]: Competition };
}

function Championships({ nation, competitions }: ChampionshipsProps) {	
	return (		
        <>      
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        {nation}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Nav>
                            <Row className="w-100">
							{
								Object.keys(competitions).map(key => {
									const name = competitions[key]?.name;															

									if (!name) {
										// Handle the case where data is missing
										return null;
									}

									return (
										<React.Fragment key={key}>                                            
											<h4 key={name} className="float-start ms-2">{name}</h4>
										</React.Fragment>
									);
								})
							} 
                            </Row>
                        </Nav>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default Championships;