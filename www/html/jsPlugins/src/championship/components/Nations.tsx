import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Championships from './Championships';
import styles from '../../../scss/aside.module.scss'; 

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

function Nations({ nationsCompetitions }: { nationsCompetitions: string }) {

	const data:NationsCompetitions = JSON.parse(nationsCompetitions);
    return (
        <>      
            <Nav className="flex-grow-1 pt-3 ps-3 pe-0">
                <Row className={"w-100 " + styles.row}>
                    <Col className="mb-2 pb-lg-0 border-lg-0 col-12">
                        <h2>NAZIONI</h2>
                    </Col>


                    {
						Object.keys(data).map(key => {
							const nationName = data[key].country?.name;
							const competitions = data[key].country?.competitions;							

							if (!nationName || !competitions) {
								// Handle the case where data is missing
								return null;
							}

							return (
								<React.Fragment key={key}>
									<Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">                                            
										<Championships 
											nation={nationName} 
											competitions={competitions}
										/>
									</Col>
								</React.Fragment>
							);
						})
					}                 
                </Row>
            </Nav>
        </>
    );
}


export default Nations;
