//{nameFile}Slice.tsx
import { createSlice, PayloadAction }       from "@reduxjs/toolkit";
import { HYDRATE }                          from "next-redux-wrapper";
import { MatchesInterface }                 from "../models/MatchInterface";
import { wrapStatusName }                   from "../../services/status";

interface FollowMatchState {
    competitionId: string,
    matchId: string
}

export const matchSlice = createSlice({
    name: 'matches',
    initialState: {},
    reducers: {        
        setMatches(state:MatchesInterface, action:PayloadAction<MatchesInterface>):MatchesInterface {               
            state = action.payload;
            return state;
        },       

        updateMatches(state: MatchesInterface, action: PayloadAction<MatchesInterface>): MatchesInterface {                    
            Object.keys(action.payload).forEach(competitionId => {
                console.log(competitionId);
                const matches = action.payload[competitionId]?.competition;
                if (matches != null) {
                    Object.keys(action.payload[competitionId].competition.matches).forEach(matchId => {
                        const {
                            match_id,
                            last_goal,
                            home_score,
                            away_score,
                            current_time,
                            status
                        } = action.payload[competitionId].competition.matches[matchId];
        
                        const match = state[competitionId]?.competition?.matches[matchId];
                        if (match != null) {                            
                            if( home_score != undefined ) {
                                state[competitionId].competition.matches[matchId].home_score    = home_score;
                            }
                            if( away_score != undefined ) {
                                state[competitionId].competition.matches[matchId].away_score    = away_score;
                            }
                            if( current_time != undefined ) {
                                state[competitionId].competition.matches[matchId].current_time  = current_time;
                            }
                            if( status != undefined ) {
                                state[competitionId].competition.matches[matchId].status        = wrapStatusName(status);
                            }
                            if( last_goal != undefined ) {
                                state[competitionId].competition.matches[matchId].last_goal     = last_goal;
                            }
                        }
                    });
                }
            });
        
            return state;
        },

        getMatches(state:MatchesInterface, action:PayloadAction<MatchesInterface>):MatchesInterface {               
            return state;
        },       

        addFollowMatch(state:MatchesInterface, action:PayloadAction<FollowMatchState>):MatchesInterface {      
            const { competitionId, matchId } = action.payload;
            
            const match = state[competitionId]?.competition?.matches[matchId];
            if( match != null ){
                state[competitionId].competition.matches[matchId].follow = true;
            }  
            
            return state;
        },

        removeFollowMatch(state:MatchesInterface, action:PayloadAction<FollowMatchState>):MatchesInterface {      
            const { competitionId, matchId } = action.payload;
            const match = state[competitionId]?.competition?.matches[matchId];
            if( match != null ){
                state[competitionId].competition.matches[matchId].follow = false;
            }  
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
export const {setMatches,getMatches,updateMatches,addFollowMatch,removeFollowMatch} = actions;
export type {FollowMatchState};
export default reducer;