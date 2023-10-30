interface GenericApiResponse<T> {
    success: boolean;
    data: {
        [key: string]: T[];
    };
}

export {GenericApiResponse};