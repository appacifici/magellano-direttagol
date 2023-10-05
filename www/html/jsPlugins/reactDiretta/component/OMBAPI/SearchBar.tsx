import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { useState, useEffect } from 'react';

export const SearchBar = ({onSearchChange}:{onSearchChange:any}) => {

    const manageSearch: React.ChangeEventHandler<HTMLInputElement> = (event):void => {
        event.preventDefault();
        const s = event.target.value.trim();
        setSearch( s );
        if( s.length > 3 ) {
            onSearchChange( s );
        }
    }

    const [search, setSearch] = useState ('');

    return(
        <form className="form-inline mt-2 mt-md-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" 
                name='search'                
                onChange={manageSearch}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            <button className="btn btn-outline-success my-2 my-sm-0" type="reset">Reset</button>
        </form>
    );
}