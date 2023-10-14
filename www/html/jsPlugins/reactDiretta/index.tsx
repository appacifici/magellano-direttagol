import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import MatchesBoard from "./pages/MatchesBoard";    
import './css/Bootstrap.min.css'; 

const container = document.getElementsByTagName('body')[0];
const root =  createRoot(container!)
root.render(<MatchesBoard/>);         


// reportWebVitals(console.log); 