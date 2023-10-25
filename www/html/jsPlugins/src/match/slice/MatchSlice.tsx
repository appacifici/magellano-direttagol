//{nameFile}Slice.tsx
import { createSlice, PayloadAction }       from "@reduxjs/toolkit";
import { HYDRATE }                          from "next-redux-wrapper";
import { MatchesInterface }                 from "../models/matchInterface";

export const matchSlice = createSlice({
    name: 'matches',
    initialState: {},
    reducers: {        
        setMatches(state:MatchesInterface, action:PayloadAction<MatchesInterface>):MatchesInterface {               
            state = action.payload;
            return state;
        },       

        updateMatches(state:MatchesInterface, action:PayloadAction<MatchesInterface>):MatchesInterface {                               
            Object.keys(action.payload).reduce((result:any, competitionId:any) => {    
                Object.keys( action.payload[competitionId].competition.matches).reduce((result:any, matchId:any) => {    
                    const { match_id, 
                            last_goal, 
                            home_score, 
                            away_score, 
                            current_time 
                    } = action.payload[competitionId].competition.matches[matchId];                    
                    
                    const match = state[competitionId]?.competition?.matches[matchId];
                    if( match != null ){
                        state[competitionId].competition.matches[matchId].home_score = home_score;
                        state[competitionId].competition.matches[matchId].away_score = away_score;
                    }                        
                },{});                    
            }, {});
                              
            return state;
        },

        getMatches(state:MatchesInterface, action:PayloadAction<MatchesInterface>):MatchesInterface {               
            return state;
        }        
    },
    
    //Reducer invocato dal wrapper next.js
    extraReducers: {
        [HYDRATE]: (state:MatchesInterface, action) :MatchesInterface => {            
            state = action.payload.matches;
            return state;
        },
      },   
});

const {actions, reducer} = matchSlice;
export const {setMatches,getMatches,updateMatches} = actions;
export default reducer;