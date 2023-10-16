import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import MatchesBoardPage from "./pages/MatchesBoard";    
import './scss/global.scss';


const container = document.getElementsByTagName('body')[0];
const root =  createRoot(container!) 
root.render(<MatchesBoardPage/>);    

// reportWebVitals(console.log);