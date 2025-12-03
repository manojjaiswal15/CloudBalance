import {combineReducers,createStore} from 'redux'
import UserReducer from './userReducer/userReducer';

const rootReducer=combineReducers({
    auth: UserReducer
})

const store=createStore(rootReducer)

export default store;