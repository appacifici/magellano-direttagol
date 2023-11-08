import { GenericApiResponse } from "./GlobalInterface";

interface FederationApiResponse extends GenericApiResponse<Federation>{    
    data: {
        federation: Federation[];
    };
}

interface Federation {
    id: string;
    name: string; 
}


export {FederationApiResponse, Federation};