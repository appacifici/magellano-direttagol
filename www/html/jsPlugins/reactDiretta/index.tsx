import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import App from "./component/App";        
import Prove from "./component/Prove";        
import reportWebVitals from './reportWebVitals';


const container = document.getElementsByTagName('body')[0];
const root =  createRoot(container!) 
root.render(<Prove/>);  


// reportWebVitals(console.log); 