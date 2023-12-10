
export type FrontendLiveMatchInterface = {
    match_id?: number;
    home_team?: string;
    away_team?: string;
    home_team_img?: string;
    away_team_img?: string;
    time?: string;
    home_score?: string;
    away_score?: string;
    first_half_away_score?: string;
    first_half_home_score?: string;
    last_goal?: "home" | "away";
    status?: string;
    current_time?: string;
    newGoal?: string;
  }
  
export type CompetitionInterface = {
    name: string;
    nation: string;
    id: number;
    matches: {
        [matchId: string]: FrontendLiveMatchInterface;
    };
}

export interface MatchesInterface {
    [competitionId: string]: {           
      competition: CompetitionInterface;
    };
}