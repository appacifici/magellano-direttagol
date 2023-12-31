import React 		from 'react';
import Nav 			from 'react-bootstrap/Nav';
import Image 		from 'react-bootstrap/Image';
import Row 			from 'react-bootstrap/Row';
import Col 			from 'react-bootstrap/Col';
import Link         from 'next/link';
import styles 		from '../../../scss/aside.module.scss'; 

function TopChampionship({ competitionsTop }:{competitionsTop:any} )  {
	const topCompetitios = JSON.parse(competitionsTop);	

	return (
		<>			
			<Nav className="pt-3 ps-3 pe-0">
				<Row className={"w-100 "+styles.row}>
					<Col className="mb-2 pb-lg-0 border-lg-0 col-12">
						<h2><i className="bi bi-star-fill"></i> TOP CAMPIONATI</h2>
					</Col>        
					{topCompetitios.map((comp:any) => (
						<Col key={comp._id} className="mb-2 pb-lg-0 pb-1 border-lg-0 col-12">																					
							<h3 className={"float-start ms-2 border-lg-0 bg-transparent"}>		
								<Link href={`/classifica/${comp.countryId.permalink}/${comp.permalink}`}>
									<Image src={`/images/flags/${comp.img}.svg`} className="float-start border border-lg-0" />
									{comp.name}
								</Link>						
							</h3>
						</Col>
					))}
        
				</Row>
			</Nav>							
		</>
	);
}

export default TopChampionship;