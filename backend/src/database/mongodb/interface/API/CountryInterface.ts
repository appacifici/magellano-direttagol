type CountryApiResponse = {
    success: boolean;
    data:    Data;
}

interface Data {
    teams:     Team[];
    total:     string;
    pages:     number;
    next_page: string;
    prev_page: string;
}

interface Team {
    id:             string;
    name:           string;
    stadium:        string;
    country:        Country;
    federation:     any[];
    name_ru:        string | false;
    translations:   Translations | any[];
}

interface Country {
    id:      string;
    name:    string;
    is_real: string;
}

interface Translations {
    ar?: string;
    ru?: string;
    fa?: string;
}

export {CountryApiResponse};