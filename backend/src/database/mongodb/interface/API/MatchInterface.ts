interface MatchApiResponse {
    success: boolean;
    data: DataMatch;
}

type DataMatch = {
    match: Match[];
}

type Match = {
    h2h: string|boolean;
    added: Date;
    league_name: string;
    last_changed: string;
    country: null | string;
    has_lineups: boolean;
    ht_score: string;
    away_id: number;
    time: string;
    score: string;
    location: string;
    league_id: number;
    et_score: string;
    id: number;
    competition_name: string;
    competition_id: number;
    scheduled: string;
    fixture_id: number;
    events: string;
    status: string;
    home_name: string;
    odds: Odds;
    home_id: number;
    ft_score: string;
    ps_score: string;
    away_name: string;
    federation: Federation;
    outcomes: Outcomes;
}

type Odds = {
    pre: {
        1: number;
        2: number;
        X: number;
    };
    live: {
        1: number;
        2: number;
        X: number;
    };
}

type Federation = {
    name: string;
    id: number;
}

type Outcomes = {
    half_time: string;
    full_time: string;
    extra_time: null | string;
}

export {MatchApiResponse};