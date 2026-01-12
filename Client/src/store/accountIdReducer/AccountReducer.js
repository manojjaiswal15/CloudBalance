import { ACCOUNT_ID } from "./accountAction";

const initialState={
    accountdata: []
}

export const AccountReducer=(state=initialState,action)=>{
    switch(action.type){
        case ACCOUNT_ID: 
            return {...state,
                 accountdata : action.payload
            };
        default:
            return state;

    }
}