import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { SearchBar } from './SearchBar';
import { Menu } from './Menu';


function NavbarSite({onSearchChange}:{onSearchChange:any}) {
      return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Menu/>
            <SearchBar onSearchChange={onSearchChange}/>        
          </Container>
        </Navbar>
      );
    } 

// function NavbarSite(params:any) {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Menu/>
//         <SearchBar {...params}/>        
//       </Container>
//     </Navbar>
//   );
// } 

export default NavbarSite;