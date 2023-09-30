import React from 'react';
import { useState, useEffect } from 'react';

function Ajax() {
    const photoUrl:string       = 'https://jsonplaceholder.typicode.com/photos'; 
    const albumsUrl:string      = 'https://jsonplaceholder.typicode.com/albums';
    const usersUrl:string       = 'https://jsonplaceholder.typicode.com/users';

    const [photos, setPhotos]   = useState([]);
    const [albums, setAlbums]   = useState([]);
    const [users, setUsers]     = useState([]);
    const [usersSelected, setSelectedUser]      = useState(1);
    const [albumSelected, setSelectedAlbum]     = useState(1);

    useEffect( () => {
        const getPhotos = async() => {
            const url = albumSelected ? photoUrl+'?albumId='+ albumSelected : photoUrl;
            const photos = await fetch(photoUrl).then(response => response.json()) //Ritorna una promise e gli specifichiamo json            
            setPhotos(photos);
        }

        if( albumSelected) {
            getPhotos();
        }
        
    }, [albumSelected])

    useEffect( () => {
        const getAlbums = async() => {
            const url = usersSelected ? albumsUrl+'?userId='+ usersSelected : albumsUrl;
            const albums = await fetch(url).then(response => response.json()) //Ritorna una promise e gli specifichiamo json            
            setAlbums(albums);
        }
        getAlbums();        
    }, [usersSelected])

    useEffect( () => {
        const getUsers = async() => {
            const users = await fetch(usersUrl).then(response => response.json()) //Ritorna una promise e gli specifichiamo json            
            setUsers(users);
        }
        getUsers();                
    }, [])

    const manageChange = ({target}: {target:any}):void => {
        if( target.name == 'users') {
            setSelectedUser(target.value);
        } else {
            console.info('si');
            setSelectedAlbum(target.value);
        }
        
    }

    const Opt = ( {id, name, userId, title}:{id:number, name:string, userId?:number, title?:number} ) => {
        const selectedOpt = id === ( userId ? albumSelected : usersSelected ) ? true : false;
        const optName = userId ? title : name;
        return(             
            <option selected={selectedOpt} value={id} key={id}>
                {optName}
            </option> 
        );
    };

    return (
        <>
            <h1>ALBUMS</h1>
            <form>
            <label htmlFor='users'> USERS                   
                    <select name='users' id='users' onChange={manageChange}>
                        <option></option>
                        {
                            users.map( user => 
                                  <Opt {...user} />
                            )
                        }a
                    </select>
                </label>
                <label htmlFor='albums'> ALBUM                   
                    <select name='albums' id='albums' onChange={manageChange}>
                        <option></option>
                        {
                            albums.map( album => 
                                <Opt {...album} />   
                            )
                        }
                    </select>
                </label>                
            </form>
            <ul>
                {
                    photos.map(photo =>
                        <li key={photo.id}>
                            <img src={photo.thumbnailUrl} title={photo.title}></img>
                        </li>
                    )
                }
            </ul>
        </>
    );
}

export default Ajax;