import { GenericApiResponse } from "./GlobalInterface";

interface TeamApiResponse extends GenericApiResponse<Team>{    
    data: {
        teams: Team[];
    };
}

type DataTeam = {
    teams: Team[];
    total: string;
    pages: number;
    next_page: string;
    prev_page: string;
}

type Team = {
    id: string;
    name: string;
    stadium: string;
    country: CountryTeam;
    federation: any[];
    name_ru: string | false;
    translations: TranslationsTeam | any[];
}

type CountryTeam = {
    id: string;
    name: string;
    is_real: string;
}

type TranslationsTeam = {
    ar?: string;
    ru?: string;
    fa?: string;
    // You can add other language keys if necessary.
}

export {TeamApiResponse,Team};