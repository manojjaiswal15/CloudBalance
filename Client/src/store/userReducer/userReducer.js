import { LOGIN, LOGOUT, LOGIN_FAIL } from './userAction'

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user || null,
    token: token || null,
    isAuthenticated: !!token,
    error: null,
};
const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN:
            localStorage.setItem("token", action.payload.user.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    firstName: action.payload.user.firstName,
                    role: action.payload.user.role,
                    id:action.payload.user.id
                })
            );
            return {
                ...state,
                user: {
                    firstName: action.payload.user.firstName,
                    role: action.payload.user.role,
                    id: action.payload.user.id
                },
                token: action.payload.user.token,
                isAuthenticated: true,
            };
        case LOGIN_FAIL:
            console.log(action?.payload)
        return {
                ...state,
                error: action.payload,
                isAuthenticated: false,
            };
        case LOGOUT:
            localStorage.clear();
            return {
                user: null,
                token: null,
                isAuthenticated: false,
            };
        

        default:
            return state;
    }
}


export default UserReducer