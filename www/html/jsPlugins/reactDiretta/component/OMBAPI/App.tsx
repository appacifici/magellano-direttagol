import React                    from 'react';
import { useState, useEffect }  from 'react';
import MovieList                from './MovieList';
import ModalDetail              from './ModalDetail';
import Bootstrap                from "react-bootstrap"; 
import NavbarSite               from './Navbar';
import '../../css/Bootstrap.min.css'; 

//https://react-bootstrap.netlify.app/docs/components/cards

const APIKEY = 'ce3a75fe';
const APIURL = 'http://www.omdbapi.com';

const fetchMovies = async( search = 'The godfather') => {
    if( search.length < 3 ) {
        return;
    }
    const response =  await fetch(APIURL+ '?apikey='+APIKEY+'&s='+search).then( res => res.json() );
    const { Error, Search:movies, totalResults: totalCount } = response; //Destrutturazione risposta
    console.log(response);
    return {movies,totalCount, Error: Error ?? ''};
}

const fetchDetailMovie = async( id:string ) => {    
    const response =  await fetch(APIURL+ '?apikey='+APIKEY+'&i='+id).then( res => res.json() );    
    console.log(response);
    return response;
}

interface MoviesIntf { 
    imbID: number,
    Title: string
}

function App() {    
    const [movies, setMovies]           = useState([]);
    const [totalCount, setTotalCount]   = useState(0);
    const [error, setError]             = useState('');
    const [movieDetail, setMovieDetail] = useState(null);

    const callApi = async(search='') => {
        const data = await fetchMovies(search); 
        setError(data.Error);
        if( data.Error.length == 0 ) {
            setMovies(data.movies);
            setTotalCount(data.totalCount);
        } else {
            setTotalCount(0);
            setMovies([]);
        }                
    }

    const openDatail = async( id = '') => {                
        const data = await fetchDetailMovie(id);        
        setMovieDetail(data);        
    }

    useEffect( () => {                 
        callApi('Godfather');
      return () => {       
      }
    }, [])
    
    return(
        <>
            <NavbarSite onSearchChange={callApi} />
            <div className='container-fluid'>
                <h1>MyMovies ({totalCount})</h1>
                {!error ? <MovieList movies={movies} onClickDetail={openDatail} /> : <h2>{error}</h2> }                
           </div> 
           <ModalDetail movieDetail={movieDetail}/>
        </>
    );
}

export default App;