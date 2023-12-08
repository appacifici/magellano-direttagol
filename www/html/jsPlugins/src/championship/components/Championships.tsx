import React 		from 'react';
import Nav 			from 'react-bootstrap/Nav';
import Row 			from 'react-bootstrap/Row';
import Accordion 	from 'react-bootstrap/Accordion';
import Link         from 'next/link';
import { Image }    from 'react-bootstrap';

interface Competition {
    name: string;
    permalink: string;
    // ... any other properties of a competition
}

interface CountryData {
    country: {
        id: string;
        name: string;
        img: string;
        competitions: { [key: string]: Competition };
    };
}

interface NationsCompetitions {
    [key: string]: CountryData;
}

interface ChampionshipsProps {
    nation: string;
    permalink: string;
    img: string;
    competitions: { [key: string]: Competition };
}

function Championships({ nation, permalink, competitions, img }: ChampionshipsProps) {	
	return (		
        <>      
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <Image src={`/images/flags/${img}.svg`} className="float-start border border-lg-0 me-1" />
                        {nation}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Nav>
                            <Row className="w-100">
							{
								Object.keys(competitions).map(key => {
									const name = competitions[key]?.name;	
                                    const link = `/standing/${permalink}/${competitions[key]?.permalink}`;														

									if (!name) {
										// Handle the case where data is missing
										return null;
									}

									return (
										<React.Fragment key={key}>                                            
											<h4 key={name} className="float-start ms-2">
                                                <Link href={link}>
                                                    {name}
                                                </Link>
                                            </h4>
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