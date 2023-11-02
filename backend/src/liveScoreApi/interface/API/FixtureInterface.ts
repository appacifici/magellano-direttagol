import { GenericApiResponse } from "./GlobalInterface";

interface FixtureApiResponse extends GenericApiResponse<Fixture>{    
    data: {
        fixtures: Fixture[];
    };
}

interface Fixture {
    competition: Competition;
    home_id: number;
    home_name: string;
    id: number;
    location: string;
    round: string;
    group_id: number;
    date: string;
    away_id: number;
    league: League;
    league_id: number;
    home_translations: Translations;
    odds: Odds;
    competition_id: number;
    time: string;
    away_name: string;
    away_translations: Translations;
    h2h: string;
}
  
interface Competition {
    name: string;
    id: number;
}
  
interface League {
    name: string | null;
    country_id: number | null;
    id: number | null;
}
  
interface Translations {
    [key: string]: string;
}
  
interface Odds {
    live: {
      '1': number | null;
      'X': number | null;
      '2': number | null;
    };
    pre: {
      '1': number;
      'X': number;
      '2': number;
    };
}

export {FixtureApiResponse,Fixture};