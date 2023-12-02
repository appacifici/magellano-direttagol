// import { FrontendLiveMatchInterface, MatchesInterface }   from "./interface/FrontendLiveMatchInterface";
import { MatchInterface, MatchesInterface } from "../match/models/MatchInterface";

class FrontendCreateResponse {
    private socketResponse:MatchesInterface;

    constructor() {
        this.socketResponse = {};
    }

    public wrapStatusName( status:string ):MatchInterface['status'] {
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
            default:
                wStatus = "next";
                break;
        }

        return wStatus;
    }

    public addLiveMatch(match:any, matchId:string) {
        const liveMatch: MatchInterface = {};
        const fullScore     = match.score?.split('-');
        const halfTimeScore = match.halfTimeScore?.split('-');       

        liveMatch.keyMatch = matchId;  

        if( typeof match.time != undefined ) {
            const hours   = match.dateMatch.getHours().toString().padStart(2, '0');
            const minutes = match.dateMatch.getMinutes().toString().padStart(2, '0');
            const seconds = match.dateMatch.getSeconds().toString().padStart(2, '0');

            liveMatch.time = `${hours}:${minutes}`;
        }    

        if( typeof match.lastGoal != undefined ) {
            liveMatch.last_goal = match.lastGoal;
        }    

        if( typeof match.status != undefined ) {
            liveMatch.status = this.wrapStatusName(match.status); 
        }                      
        
        if( typeof match.timeMatch != undefined ) {
            liveMatch.current_time = match.timeMatch;
        }        
        if( fullScore != undefined && fullScore[0] != null ) {
            liveMatch.home_score = fullScore[0]?.trim();
        }      
        if( fullScore != undefined && fullScore[0] != null ) {
            liveMatch.away_score = fullScore[1]?.trim();        
        }
        if( halfTimeScore != undefined && halfTimeScore[0] != null ) {
            liveMatch.first_half_away_score = halfTimeScore[0]?.trim();
        } 
        if( halfTimeScore != undefined && halfTimeScore[1] != null ) {
            liveMatch.first_half_home_score = halfTimeScore[1]?.trim();
        }
        if( match.teamHome != undefined && match.teamHome != null ) {
            liveMatch.away_team = match.teamHome.name;            
        }
        if( match.teamAway != undefined && match.teamAway != null ) {
            liveMatch.home_team = match.teamAway.name;            
        }

        liveMatch.away_team_img = match.competitionId.name;
        liveMatch.home_team_img = match.competitionId.name;
        liveMatch.follow = false;        
        

        const matchNumber = matchId;
        if (!this.socketResponse[match.competitionId._id.toString()]) {
            this.socketResponse[match.competitionId._id.toString()] = {
                competition: {
                    name:   match.competitionId.name,
                    nation: match.competitionId.countryId.name,
                    img:    this.sanitizeString(match.competitionId.countryId.name),
                    id:     match.competitionId._id.toString(),
                    matches: {}
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