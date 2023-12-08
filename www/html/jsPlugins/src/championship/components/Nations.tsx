import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Championships from './Championships';
import styles from '../../../scss/aside.module.scss'; 

interface Competition {
    name: string;
    permalink: string;
}

interface CountryData {
    country: {
        id: string;
        name: string;        
        permalink: string;        
        img: string;
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
							const nationName   = data[key].country?.name;
							const permalink   = data[key].country?.permalink;
							const img          = sanitizeString(data[key].country?.name);
							const competitions = data[key].country?.competitions;							

							if (!nationName || !competitions) {
								// Handle the case where data is missing
								return null;
							}

                            const count = Object.keys(competitions).length;

							return (
                                <>
                                    {count > 0 ? (
                                        <React.Fragment key={key}>
                                            <Col className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">                                            
                                                <Championships 
                                                    nation={nationName} 
                                                    permalink={permalink} 
                                                    img={img} 
                                                    competitions={competitions}
                                                />
                                            </Col>
                                        </React.Fragment>
                                    ) : (
                                        // Altrimenti puoi mostrare un messaggio alternativo o nulla
                                        <></>
                                    )}
                                </>
							);
						})
					}                 
                </Row>
            </Nav>
        </>
    );
}


const sanitizeString = (str:string) => {
    // Elimina i caratteri speciali eccetto lo spazio
    let sanitizedString = str.replace(/[^a-zA-Z0-9 ]/g, "");

    // Sostituisce gli spazi con il simbolo -
    sanitizedString = sanitizedString.replace(/\s+/g, "-");

    return sanitizedString;
}

export default Nations;
