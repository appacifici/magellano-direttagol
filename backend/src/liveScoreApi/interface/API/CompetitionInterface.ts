interface CompetitionApiResponse {
    success: boolean;
    data:    DataPayload;
}

interface DataPayload {
    competition: Competition[];
}

interface Competition {
    id:                  string;
    name:                string;
    is_league:           string;
    is_cup:              string;
    tier:                string;
    has_groups:          string;
    active:              string;
    national_teams_only: string;
    countries:           Country[];
    federations:         Federation[];
    season:              Season;
}

interface Country {
    id:         string;
    name:       string;
    flag?:      string;
    fifa_code?: string;
    uefa_code?: string;
    is_real:    string;
}

interface Federation {
    id:   string;
    name: string;
}

interface Season {
    id:    string;
    name:  string;
    start: string;
    end:   string;
}

export {CompetitionApiResponse};
