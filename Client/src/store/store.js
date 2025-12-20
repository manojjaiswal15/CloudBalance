import {applyMiddleware, combineReducers,createStore} from 'redux'
import UserReducer from './userReducer/userReducer';
import { thunk } from "redux-thunk";

const rootReducer=combineReducers({
    auth: UserReducer
})

const store=createStore(rootReducer,applyMiddleware(thunk))

export default store;