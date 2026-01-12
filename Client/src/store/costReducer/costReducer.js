import { COST_ALLDATA } from "./costAction";

const initialState = {
    costdata: []
};

export const CostReducer = (state = initialState, action) => {
    switch (action.type) {

        case COST_ALLDATA:
            return {
                ...state,
                costdata: action.payload
            };

        default:
            return state;
    }
};
