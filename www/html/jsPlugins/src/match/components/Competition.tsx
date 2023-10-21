import React from "react";
import { Col, Image, Row } from "react-bootstrap";

import stlMatchBoard    from '../../../scss/matchBoard.module.scss';
import MatchBoard from "./MatchBoard";
import { MatchesInterface } from "../models/matchInterface";

const Competition = ({matches, tabStatusMatch}:{matches:MatchesInterface, tabStatusMatch:string}) => {    
    
    const getMatches  = ( matches:any ) => {          
        return Object.keys(matches).map( (key: any) => <>                
            { (matches[key].status == tabStatusMatch || tabStatusMatch == 'all' ) && <MatchBoard key={matches.match_id} match={matches[key]}/>}
        </> );
    }

    return( <>                
        <Row key={matches.competition.id} className={`${stlMatchBoard.championship}`}>
            <Col xs={1} md={1}><i className={`bi bi-star ${stlMatchBoard.biStar}`}></i></Col>
            <Col xs={10} className='text-center mt-1'>
                <Image src={"/images/flags/"+matches.competition.nation+".png"}/>
                    {matches.competition.name}
            </Col>
        </Row>
        {getMatches(matches.competition.matches)}
        
    </>); 
};

export default Competition;