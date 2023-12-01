import { GenericApiResponse } from "./GlobalInterface";

interface StandingApiResponse extends GenericApiResponse<Standing>{    
    data: {
        fixtures: Standing[];
    };
}

interface Standing {
    league_id: string;
    season_id: string;
    name: string;
    rank: string;
    points: string;
    matches: string;
    goal_diff: string;
    goals_scored: string;
    goals_conceded: string;
    lost: string;
    drawn: string;
    won: string;
    team_id: string;
    competition_id: string;
    group_id: string;
    group_name: string;
    stage_name: string;
    stage_id: string;
    form: string[];
}

export {StandingApiResponse,Standing};