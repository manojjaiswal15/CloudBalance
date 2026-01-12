// src/store/costReducer/costAction.js
export const COST_ALLDATA = "COST_ALLDATA";

export const costAllData = (data) => ({
    type: COST_ALLDATA,
    payload: data
});
