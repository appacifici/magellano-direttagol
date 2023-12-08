const checkStatusMatchInTabStatus = (matchStatus:string, tabStatusMatch:string):boolean => {
    if( tabStatusMatch == 'live' ) {
        const statiConsentiti = ['live', 'interval', 'added_time'];
        return statiConsentiti.includes(matchStatus) ? true : false;
    } else {
        return matchStatus == tabStatusMatch ? true : false;
    }    
}

export {checkStatusMatchInTabStatus};