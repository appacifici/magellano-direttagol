import connectMongoDB       from "../../database/mongodb/connect";
import { GenericApiResponse } from "../interface/API/GlobalInterface";

type TransformFunction<T, U> = (input: T) => U;

class BaseAPiConverter {

    constructor() {
        connectMongoDB();        
    }

    private transformItemToType<Z, T, U>(item: T, transformFn: TransformFunction<T, U>): U {
        return transformFn(item);
    }
    
    public transformAPIResponseToArray<T, U>(
        response: GenericApiResponse<T>,
        key: string,
        transformFn: TransformFunction<T, U>
    ): U[] {        
        return response.data[key].map(item => this.transformItemToType(item, transformFn));
    }
    

}

export default BaseAPiConverter;