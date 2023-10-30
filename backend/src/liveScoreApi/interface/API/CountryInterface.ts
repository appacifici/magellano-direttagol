import { GenericApiResponse } from "./GlobalInterface";

interface CountryApiResponse extends GenericApiResponse<Country>{    
    data: {
        country: Country[];
    };
}

interface Country {
    id: string;
    name: string;
    is_real: string;
    leagues: string;
    scores: string;
    national_team: NationalTeam | null;
    federation: Federation;
}

interface NationalTeam {
    id: string;
    name: string;
    stadium: string;
    location: string;
}

interface Federation {
    id: string;
    name: string;
}


export {CountryApiResponse, Country};