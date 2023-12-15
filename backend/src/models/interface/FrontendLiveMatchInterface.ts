
export type FrontendLiveMatchInterface = {
  match_id?:              string;
  home_team?:             string;
  away_team?:             string;
  home_team_img?:         string;
  away_team_img?:         string;
  home_country_img?:      string;
  away_country_img?:      string;
  time?:                  string;
  timeMatch?:             string;
  home_score?:            string;
  away_score?:            string;
  first_half_away_score?: string;
  first_half_home_score?: string;
  last_goal?:             "home" | "away";
  status?:                "next" | "interval" | "added_time" | "ended" | "live";
  current_time?:          string;
  follow?:                boolean;
  keyMatch?:              string;
  newGoal?:               boolean;
}
  
export type CompetitionInterface = {
  name:         string;
  nation:       string;
  img:          string;
  id:           number;
  countryName:  string;
  matches: {
      [matchId: string]: FrontendLiveMatchInterface;
  };
}

export interface MatchesInterface {
    [competitionId: string]: {           
      competition: CompetitionInterface;
      name?:         string;
      nation?:       string;
      img?:          string;
      id?:           number;
      countryName?:  string;
      matches?: {
          [matchId: string]: FrontendLiveMatchInterface;
      };
    };
}