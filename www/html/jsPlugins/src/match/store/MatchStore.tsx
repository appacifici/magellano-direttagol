import { configureStore }   from "@reduxjs/toolkit";
import { createWrapper }    from 'next-redux-wrapper';

import tabMatchReducer      from "../slice/TabMatchSlice";
import matchReducer         from "../slice/MatchSlice";

const matchStore = () => configureStore({
    reducer: {
        tabMatch: tabMatchReducer,
        matches: matchReducer,
    }
});

export const wrapperMatch = createWrapper(matchStore);



