import React from "react";
import Card  from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';

const MovieItem = ({ movie, onClickDetail }: { movie: any, onClickDetail :any }) => {

    const manageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();    
        const button: HTMLButtonElement = event.currentTarget;
        onClickDetail( button.id );        
    }

    return (
        <Card style={{ width: '18rem' }} className="card">
            <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                    Anno {movie.Year}
                </Card.Text>
                <Button  className="btn btn-primary"
                    onClick={manageClick}
                    id={movie.imdbID}
                >
                    Guarda Dettagli
                </Button>
            </Card.Body>
        </Card>
    );
}

export default MovieItem;