import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name:"userSlice",
        initialState:null,
        reducers:
        {
            addUser:(state,action)=>
                {
                    return action.payload;
                },
            removeUser:(state,action)=>
                {
                    return null;
                }
        }
    })

const feedSlice = createSlice(
    {
        name:"feedSlice",
        initialState:null,
        reducers:
        {
            addFeed:(state,action)=>
                {
                    return action.payload
                },
            removeFeed:(state,action)=>
                {
                    console.log(state)
                    const tempArray = state.filter((res)=>
                        {
                            return res._id != action.payload
                        })
                    return tempArray;
                }
        }
    })

const connectionSlice = createSlice(
    {
        name:"connectionSlice",
        initialState:null,
        reducers:
        {
            addConnection:(state,action)=>
                {
                    return action.payload;
                },
            removeConnection:(state,action)=>
                {
                    return null;
                }
        }
    })

const RequestsSlice = createSlice(
    {
        name:"requestsSlice",
        initialState:null,
        reducers:
        {
            addRequests:(state,action)=>
                {
                    return action.payload;
                },
            removeRequests:(state,action)=>
                {
                    return null;
                }
        }
    })


export const {addRequests,removeRequests} = RequestsSlice.actions;
export const {addConnection,removeConnection}  = connectionSlice.actions;
export const {addFeed,removeFeed} = feedSlice.actions;
export const {addUser,removeUser} = userSlice.actions;


export const feedReducer = feedSlice.reducer;
export const connectionReducer = connectionSlice.reducer;
export const userReducer = userSlice.reducer;
export const requestReducer = RequestsSlice.reducer;
