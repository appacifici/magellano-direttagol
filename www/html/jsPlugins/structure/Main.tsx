import React        from 'react';
import Container    from 'react-bootstrap/Container';
import Row          from 'react-bootstrap/Row';
import Col          from 'react-bootstrap/Col';
import AsideList    from '../championship/components/AsideList';

const Main = ( { MatchBoard }:{MatchBoard:any} ) => {
    return( 
        <Container>  
            <Row>
                <Col xs={6} lg={3}>
                    <AsideList></AsideList>
                </Col>
                <Col xs={12} lg={7}>
                    {MatchBoard}
                </Col>                
            </Row>        
        </Container>
    );
}

export default Main;