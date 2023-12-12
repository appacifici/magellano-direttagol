// components/StandingTable.js
import React                        from 'react';
import { Container }                from 'react-bootstrap';
import Table                        from 'react-bootstrap/Table';
import { StandingArrayWithIdType, 
    StandingWithIdType }            from '../../dbService/models/Standing';

import stlStanding                  from '../../../scss/standing.module.scss';

const StandingTable = ({ standings }:{ standings:StandingArrayWithIdType }) => {
    console.log(standings);
    return (
        <Container fluid="md" className={`${stlStanding.standingTable} rounded mt-4`}>        
            <Table responsive>
                <thead>
                    <tr className="text-success">
                        <th></th>
                        <th>Nome</th>
                        <th>PG</th>                                                
                        <th>V</th>
                        <th>N</th>
                        <th>P</th>
                        <th>R</th>
                        <th>DR</th>
                        <th>P</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {standings.map((standing:StandingWithIdType) => (
                        <tr key={standing._id}>
                            <td className={`${stlStanding.rank}`}>{standing.rank}</td>   
                            <td>{standing.name}</td>                                                     
                            <td>{standing.matches}</td>
                            <td>{standing.won}</td>
                            <td>{standing.drawn}</td>
                            <td>{standing.lost}</td>
                            <td>{standing.goalsScored}:{standing.goalsConceded}</td>
                            <td>{standing.goalDiff}</td>
                            <td>{standing.points}</td>
                            {/* Aggiungi altre celle di dati qui */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default StandingTable;