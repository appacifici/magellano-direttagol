'use strict';

import {MaBrowserMobileOS,MaBrowserVersion} from "../class/maBrowser";

export default interface MaBrowser { 
    mobileOS:               MaBrowserMobileOS;
    browserVersion:         MaBrowserVersion;
    mobile:                 boolean;
    touch:                  boolean;

    isTouchDevice():        boolean;    
    isMobile():             boolean;
    getMobileOs():          MaBrowserMobileOS;
    getBrowserVersion():    MaBrowserVersion;    
}