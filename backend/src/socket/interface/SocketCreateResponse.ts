import { SocketLiveMatchInterface, CompetitionInterface, MatchesInterface } from "./SockeLiveMatchInterface";
import * as MatchMongo                      from "../../database/mongodb/models/Match";
import { CompetitionWithIdType }                  from "../../database/mongodb/models/Competition";

class SocketCreateResponse {
    private socketResponse:MatchesInterface;

    constructor() {
        this.socketResponse = {};
    }

    public addLiveMatch(match:any) {
        const fullScore     = match.fullTimeScore?.split('-');
        const halfTimeScore = match.halfTimeScore?.split('-');

        const liveMatch: SocketLiveMatchInterface = {            
            home_score:             fullScore[0]?.trim(),
            away_score:             fullScore[1]?.trim(),
            first_half_away_score:  halfTimeScore[0]?.trim(),
            first_half_home_score:  halfTimeScore[1]?.trim(),
            //last_goal:              match._id,
            status:                 match.status,
            current_time:           match.timeMatch
        };

        //liveMatch.home_score =  fullScore[0]?.trim();

        const matchNumber = match._id;
        if (!this.socketResponse[match.competitionId._id]) {
            this.socketResponse[match.competitionId._id] = {
                competition: {
                    name:   match.competitionId.name,
                    nation: match.competitionId.name,
                    id:     match.competitionId._id,               
                    matches: {}
                }             
            }
        }
                
        this.socketResponse[match.competitionId._id].competition.matches[matchNumber]  = liveMatch;
    }

    get objResponse():MatchesInterface {
        return this.socketResponse;
    }

}

export default SocketCreateResponse;