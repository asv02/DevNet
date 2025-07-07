import {configureStore} from '@reduxjs/toolkit'
import {userReducer,feedReducer, connectionReducer, requestReducer} from './appSlice'

export const appStore = configureStore(
    {
        reducer:
        {
            userReducer:userReducer,
            feedReducer:feedReducer,
            connectionReducer:connectionReducer,
            requestReducer:requestReducer
        }
    })