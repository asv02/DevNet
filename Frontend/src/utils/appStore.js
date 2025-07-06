import {configureStore} from '@reduxjs/toolkit'
import userReducer from './appSlice'

export const appStore = configureStore(
    {
        reducer:
        {
            userReducer:userReducer
        }
    })