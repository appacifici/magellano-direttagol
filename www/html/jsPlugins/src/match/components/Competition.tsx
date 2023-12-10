import React, { useEffect, useState }                from "react";
import { Col, Image, Row }  from "react-bootstrap";
import stlMatchBoard        from '../../../scss/matchBoard.module.scss';
import MatchBoard           from "./MatchBoard";
import { MatchesInterface } from "../models/MatchInterface";
import { checkStatusMatchInTabStatus } from '../../services/status';

const Competition = ({matches, tabStatusMatch}:{matches:MatchesInterface, tabStatusMatch:string}) => {
    const getMatches = ( matches:any, competitionId:string, nation:string ) => {          
        return Object.keys(matches).map( (key: any) => <>                
            { (checkStatusMatchInTabStatus(matches[key].status, tabStatusMatch) || tabStatusMatch == 'all' || ( matches[key].follow == true && tabStatusMatch == 'follow' ) ) && <MatchBoard key={matches.match_id} match={matches[key]} competitionId={competitionId} nation={nation}/>}
        </> );
    }

    const getCompetition = (matches:any) => {
        if( Object.keys(matches.competition.matches).length == 0 ) {
            return <></>;
        }

        let hasMatch = false;
        Object.keys(matches.competition.matches).forEach((key) => {
            if (checkStatusMatchInTabStatus(matches.competition.matches[key].status, tabStatusMatch) || tabStatusMatch === 'all' || ( matches.competition.matches[key].follow == true && tabStatusMatch == 'follow' ) ) {
                hasMatch = true;                
            }
        });

        if( !hasMatch ) {
            return <></>;
        }

        return <Row key={matches.competition.id} className={`${stlMatchBoard.championship}`}>
            {/* <Col xs={1} md={1}><i className={`bi bi-star ${stlMatchBoard.biStar}`}></i></Col> */}
            <Col xs={10} className='text-center mt-1'>
                <Image src={"/images/flags/"+matches.competition.nation+".svg"}/>
                    {matches.competition.name} - {matches.competition.nation}
            </Col>
        </Row>;
    }
            

    return( <>              
        {getCompetition(matches)}
        {getMatches(matches.competition.matches, matches.competition.id, matches.competition.nation)}                 
    </>); 
};

export default Competition;