import { MatchInterface } from "../match/models/MatchInterface";

const checkStatusMatchInTabStatus = (matchStatus:string, tabStatusMatch:string):boolean => {
    if( tabStatusMatch === 'live' ) {
        const statiConsentiti = ['live', 'interval', 'added_time'];
        return statiConsentiti.includes(matchStatus) ? true : false;
    } else {
        return matchStatus === tabStatusMatch ? true : false;
    }    
}

const wrapStatusName = ( status:string ):MatchInterface['status'] => {
    let wStatus: MatchInterface['status']; // dichiarazione esplicita del tipo
    switch (status) {
        case 'IN PLAY':
            wStatus = "live";
            break;
        case 'FINISHED':
            wStatus = "ended";
            break;
        case 'HALF TIME BREAK':
            wStatus = "interval";
            break;
        case "ADDED TIME":
            wStatus = "added_time";
            break;
        case "NOT STARTED":
            wStatus = "next";
            break;
        default:
            wStatus = "next";
            break;
    }

    return wStatus;
}

export {checkStatusMatchInTabStatus, wrapStatusName};