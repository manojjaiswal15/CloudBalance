import { LOGIN, LOGOUT, LOGIN_FAIL }  from './userAction'

const initialState = {
    user:null,
    isAuthenticated: false,
    error:null
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN:
            return { ...state, user:action.payload.user, 
                 isAuthenticated: true, 
                 error:null
            }
        case LOGIN_FAIL:
            return{...state,isAuthenticated:false,user:null,error:action.payload}

        case LOGOUT:
            return initialState
        default:
            return state
    }
}

export default UserReducer