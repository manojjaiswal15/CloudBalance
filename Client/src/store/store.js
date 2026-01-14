import {applyMiddleware, combineReducers,createStore} from 'redux'
import UserReducer from './userReducer/userReducer';
import { thunk } from "redux-thunk";
import { CostReducer } from './costReducer/costReducer';
import { AccountPerUserReducer, AccountReducer } from './accountIdReducer/AccountReducer';

const rootReducer=combineReducers({
    auth: UserReducer,
    cost: CostReducer,
    account:AccountReducer,
    accountperuser:AccountPerUserReducer
})

const store=createStore(rootReducer,applyMiddleware(thunk))

export default store;