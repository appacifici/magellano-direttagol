import React from "react";
import MovieItem from "./MovieItem";

const MovieList = ({movies,onClickDetail}:{movies:any, onClickDetail:any }) => {
    return(
        <div className="row">
            {movies.map( (movie: { imdbID: React.Key; Title: string }) => <
                MovieItem key={movie.imdbID} movie={movie} onClickDetail={onClickDetail}/>
                )
            }
        </div>
    );
}   

export default MovieList;