import React        from 'react';
import Container    from 'react-bootstrap/Container';
import Row          from 'react-bootstrap/Row';
import Col          from 'react-bootstrap/Col';
import AsideList    from '../championship/components/AsideList';

const Main = ( { nationsCompetitions,competitionsTop,MatchBoard }:{nationsCompetitions:any,competitionsTop:any,MatchBoard:any} ) => {
    
    return( 
        <Container>  
            <Row>
                <Col xs={6} lg={3}>
                    <AsideList nationsCompetitions={nationsCompetitions} competitionsTop={competitionsTop}></AsideList>
                </Col>
                <Col xs={12} lg={7} className="p-1">
                    {MatchBoard}
                </Col>                
            </Row>        
        </Container>
    );
}

export default Main;