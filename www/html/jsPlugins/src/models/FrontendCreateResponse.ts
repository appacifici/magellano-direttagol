// import { FrontendLiveMatchInterface, MatchesInterface }   from "./interface/FrontendLiveMatchInterface";
import { MatchInterface, MatchesInterface } from "../match/models/MatchInterface";
import { wrapStatusName } from "../services/status";
import { sanitizeString } from "../services/globalNext";

class FrontendCreateResponse {
    private socketResponse:MatchesInterface;

    constructor() {
        this.socketResponse = {};
    }    

    public addLiveMatch(match:any, matchId:string) {
        const liveMatch: MatchInterface = {};
        const fullScore     = match.score?.split('-');
        const halfTimeScore = match.halfTimeScore?.split('-');       

        console.log(match);
        liveMatch.keyMatch = matchId;  

        if( typeof match.newGoal !== "undefined") {
            liveMatch.newGoal  = match.newGoal;
        }

        if( typeof match.time !== "undefined" ) {
            const hours    = match.dateMatch.getHours().toString().padStart(2, '0');
            const minutes  = match.dateMatch.getMinutes().toString().padStart(2, '0');     
            liveMatch.time = `${hours}:${minutes}`;
        }    

        if( typeof match.lastGoal !== "undefined" ) {
            liveMatch.last_goal = match.lastGoal;
        }    

        if( typeof match.status !== "undefined" ) {
            liveMatch.status = wrapStatusName(match.status); 
        }                      
        
        if( typeof match.timeMatch !== "undefined" ) {
            liveMatch.current_time = match.timeMatch;
        }        
        if( fullScore !== undefined && fullScore[0] !== null && fullScore[0] !== undefined ) {
            liveMatch.home_score = fullScore[0]?.trim();
        }      
        if( fullScore !== undefined && fullScore[1] !== null && fullScore[1] !== undefined ) {
            liveMatch.away_score = fullScore[1]?.trim();        
        }
        if( halfTimeScore !== undefined && halfTimeScore[0] !== null && halfTimeScore[0] !== undefined ) {
            liveMatch.first_half_away_score = halfTimeScore[0]?.trim();
        } 
        if( halfTimeScore !== undefined && halfTimeScore[1] !== null && halfTimeScore[1] !== undefined ) {
            liveMatch.first_half_home_score = halfTimeScore[1]?.trim();
        }
        if( match.teamHome !== undefined && match.teamHome !== null ) {
            liveMatch.home_team = match.teamHome.name;            
        }
        if( match.teamAway !== undefined && match.teamAway !== null ) {
            liveMatch.away_team = match.teamAway.name;            
        }        


        
        liveMatch.home_team_img     = match.competitionId.name;        
        liveMatch.away_team_img     = match.competitionId.name;     

        // console.log(match.competitionId.img );  
        const compImg = this.sanitizeString(match.competitionId.name);

        liveMatch.home_team_img  = match.homeCountry.isTop === 1 ? match.teamHome.img : (match.competitionId.isTop === 1 ? compImg: match.homeCountry.img);   
        liveMatch.away_team_img  = match.awayCountry.isTop === 1 ? match.teamAway.img : (match.competitionId.isTop === 1 ? compImg : match.awayCountry.img);      
        liveMatch.follow = false;        
        

        const matchNumber = matchId;
        if (!this.socketResponse[match.competitionId._id.toString()]) {
            this.socketResponse[match.competitionId._id.toString()] = {
                competition: {
                    name:   match.competitionId.name,
                    nation: (match.competitionId.isTop === 1 ? compImg : this.sanitizeString(match.competitionCountry.name)),
                    img:    (match.competitionId.isTop === 1 ? compImg : this.sanitizeString(match.competitionCountry.name)),
                    id:     match.competitionId._id.toString(),
                    countryName: match.competitionCountry.name ?? '',
                    matches: {}, // Aggiungi questa proprietà
                }             
            }
        }              
        this.socketResponse[match.competitionId._id].competition.matches[matchNumber] = liveMatch;
    }

    get objResponse():MatchesInterface {
        return this.socketResponse;
    }

    private sanitizeString(str:string) {
        // Elimina i caratteri speciali eccetto lo spazio
        let sanitizedString = str.replace(/[^a-zA-Z0-9 ]/g, "");
    
        // Sostituisce gli spazi con il simbolo -
        sanitizedString = sanitizedString.replace(/\s+/g, "-");
    
        return sanitizedString;
    }
}

export default FrontendCreateResponse;