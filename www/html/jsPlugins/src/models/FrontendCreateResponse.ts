// import { FrontendLiveMatchInterface, MatchesInterface }   from "./interface/FrontendLiveMatchInterface";
import { MatchInterface, MatchesInterface } from "../match/models/matchInterface";

class FrontendCreateResponse {
    private socketResponse:MatchesInterface;

    constructor() {
        this.socketResponse = {};
    }

    public addLiveMatch(match:any, matchId:number) {
        const liveMatch: MatchInterface = {};

        console.log(match);

        const fullScore     = match.score?.split('-');
        const halfTimeScore = match.halfTimeScore?.split('-');       

        if( typeof match.status != undefined ) {
            liveMatch.status = match.status;
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

        //liveMatch.time = match.dateMatch;

        const matchNumber = matchId;
        if (!this.socketResponse[match.competitionId._id]) {
            this.socketResponse[match.competitionId._id] = {
                competition: {
                    name:   match.competitionId.name,
                    nation: match.competitionId.name,
                    id:     match.competitionId.externalId,
                    matches: {}
                }             
            }
        }                
        this.socketResponse[match.competitionId._id].competition.matches[matchNumber] = liveMatch;
    }

    get objResponse():MatchesInterface {
        return this.socketResponse;
    }
}

export default FrontendCreateResponse;