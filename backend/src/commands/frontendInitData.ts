import { Command }  from 'commander';
import FrontendData from '../services/FrontendData';

const program = new Command();
program.version('1.0.0').description('CLI team commander')     
    .action((options) => {    
        new FrontendData(); 
    });
program.parse(process.argv);