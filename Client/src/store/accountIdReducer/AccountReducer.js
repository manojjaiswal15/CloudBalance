import { ACCOUNT_ID, ACCOUNTPERUSER } from "./accountAction";

const initialState={
    accountdata: []
}

const initialState1 = {
  accountPerUserData: null
};

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



export const AccountPerUserReducer = (state = initialState1, action) => {
  switch (action.type) {
    case ACCOUNTPERUSER:
      return {
        ...state,
        accountPerUserData: action.payload   
      };
    default:
      return state;
  }
};
