
export type MatchInterface = {
    match_id: string;
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
    status?: "live" | "ended" | "next";
    current_time?: string;
  }
  
export type CompetitionInterface = {
    name: string;
    nation: string;
    id: number;
    matches: {
        [matchId: string]: MatchInterface;
    };
}

export interface MatchesInterface {
    [competitionId: string]: {           
      competition: CompetitionInterface;
    };
}