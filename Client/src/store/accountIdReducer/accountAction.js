export const ACCOUNT_ID="ACCOUNT_ID"
export const ACCOUNTPERUSER="ACCOUNTPERUSER"


export const accountId=(data)=>({
    type:ACCOUNT_ID, payload: data 
})

export const accountPerUser=(data)=>({
    type:ACCOUNTPERUSER, payload:data
})