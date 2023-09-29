/*
 *  Classe per la gestione dei Log a console
 *  
 *  Di default eredita necessita del componente `maLogSetting` che viene instanziato dalla classe padre maSetting, da cui ricava dei livelli dei log da stampare
 *  
 *  Per sovrascrivere da browser i livelli da stampare aggiungere nella url 
 *  la var levelLog con i livelli di log che si desidera stampare divisi da virgola: `?levelLog=log,error,...`
 */
'use strict';

import {LogSettingInterface} from '../../../module/settings/class/maLogSetting'; 
import MaLogInterface from '../interface/maLog';

export default class MaLog implements MaLogInterface  { 
    private debug:  boolean;
    private prefix: string;
    private level:  LogSettingInterface;

    constructor( debug:boolean, prefix: string, level:LogSettingInterface ) {       
        let that    = this;   
        this.debug  = debug;      
        this.prefix = prefix;      
        this.level  = level;      
        this.overrideParameters();
    }

    private overrideParameters(): void {
        //Per controllare il livello di log da browser aggiunere `?levelLog=log,error,...`
        const searchParams = new URLSearchParams(window.location.search);
        if( searchParams.get("levelLog") != null) {
            this.level.logLevel.info    = searchParams.get("levelLog").includes('info') ?? null;
            this.level.logLevel.log     = searchParams.get("levelLog").includes('log') ?? null;
            this.level.logLevel.error   = searchParams.get("levelLog").includes('error') ?? null;
            this.level.logLevel.warning = searchParams.get("levelLog").includes('warning') ?? null;
            this.level.logLevel.table   = searchParams.get("levelLog").includes('table') ?? null;
        }
    }

    public TVGLog(l:string , m:string, e = false): void {
        if (this.debug)
        {
            if (e) {
                console.log('%c TVGLog ' + l + ' ' + m, 'background: #ff7f50; color: #000');
            }
            else {
                console.log('%c TVGLog ' + l + ' ' + m, 'background: #ffff00; color: #000');
            }
        }
    };

    public info( message:string ): void {
        if( this.debug === false ) {
            return null;
        }

        if( this.level.logLevel.info ) { 
            console.info( `${this.prefix}: ${message}`); 
        }
    }
    
    public log( message:string ): void {
        if( this.debug === false ) {
            return null;
        }
        
        if( this.level.logLevel.log ) { 
            console.log( `${this.prefix}: ${message}`); 
        }
    }

    public error( message:string ): void {
        if( this.debug === false ) {
            return null;
        }

        if( this.level.logLevel.error ) { 
            console.error( `${this.prefix}: ${message}`); 
        }
    }
    
    public warning( message:string ): void {
        if( this.debug === false ) {
            return null;
        }

        if( this.level.logLevel.warning ) { 
            console.warn( `${this.prefix}: ${message}`); 
        }
    }
    
    public table( data:Array<any> ): void {        
        if( this.debug === false ) {
            return null;
        }
        
        if( this.level.logLevel.table ) { 
            console.table(data);
        }
    }
}