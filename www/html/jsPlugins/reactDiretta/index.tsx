import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import App from "./component/App";        
import Prove from "./component/Prove";         
import ReduxTest from "./component/ReduxTest";   


const container = document.getElementsByTagName('body')[0];
const root =  createRoot(container!) 
root.render(<ReduxTest/>);         


// reportWebVitals(console.log); 