import { FrontendLiveMatchInterface, MatchesInterface }   from "./interface/FrontendLiveMatchInterface";

class FrontendCreateResponse {
    private socketResponse:MatchesInterface;

    constructor() {
        this.socketResponse = {};
    }

    public addLiveMatch(match:any, matchId:number) {
        const liveMatch: FrontendLiveMatchInterface = {};

        const fullScore     = match.score?.split('-');
        const halfTimeScore = match.halfTimeScore?.split('-');       

        liveMatch.newGoal = match.newGoal;

        if( typeof match.lastGoal != undefined ) {
            liveMatch.last_goal = match.lastGoal;
        }      
        if( typeof match.status != undefined ) {
            liveMatch.status = match.status;
        }      
        if( typeof match.timeMatch != undefined ) {
            liveMatch.current_time = match.timeMatch;
        }        
        if( fullScore != undefined && fullScore[0] !== null && fullScore[0] !== undefined ) {
            liveMatch.home_score = fullScore[0]?.trim();
        }      
        if( fullScore != undefined && fullScore[1] !== null && fullScore[1] !== undefined ) {
            liveMatch.away_score = fullScore[1]?.trim();        
        }
        if( halfTimeScore != undefined && halfTimeScore[0] !== null && halfTimeScore[0] !== undefined ) {
            liveMatch.first_half_away_score = halfTimeScore[0]?.trim();
        } 
        if( halfTimeScore != undefined && halfTimeScore[1] !== null && halfTimeScore[1] !== undefined ) {
            liveMatch.first_half_home_score = halfTimeScore[1]?.trim();
        }
        if( match.away_team != undefined && match.away_team != null ) {
            liveMatch.away_team = match.away_team;
        }
        if( match.home_team != undefined && match.home_team != null ) {
            liveMatch.home_team = match.home_team;
        }

        const compImg = this.sanitizeString(match.competitionId.name);

        const matchNumber = matchId;
        if (!this.socketResponse[match.competitionId._id]) {
            this.socketResponse[match.competitionId._id] = {
                competition: {
                    name:   match.competitionId.name,
                    nation: (match.competitionId.isTop === 1 ? compImg : this.sanitizeString(match.competitionId.countryId.name)),
                    img:    (match.competitionId.isTop === 1 ? compImg : this.sanitizeString(match.competitionId.countryId.name)),
                    id:     match.competitionId._id.toString(),
                    countryName: match.competitionId?.countryName ?? '',
                    matches: {}, // Aggiungi questa proprietà
                }             
            }
        }                
        this.socketResponse[match.competitionId._id].competition.matches[matchNumber] = liveMatch;
    }

    private sanitizeString(str:string) {
        // Elimina i caratteri speciali eccetto lo spazio
        let sanitizedString = str.replace(/[^a-zA-Z0-9 ]/g, "");
    
        // Sostituisce gli spazi con il simbolo -
        sanitizedString = sanitizedString.replace(/\s+/g, "-");
    
        return sanitizedString;
    }

    get objResponse():MatchesInterface {
        return this.socketResponse;
    }
}

export default FrontendCreateResponse;