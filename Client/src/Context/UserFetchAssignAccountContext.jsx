import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { account_base_url } from "../Service/service";



export const UserFetchAssignAccountContext = createContext([]);

export const UserFetchAssignAccountProvider = ({ children }) => {
    const [AssignAccount, setAssignAccount] = useState([]);
    const token = localStorage.getItem("token")
    const user=JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
          if (!token) return;
        const fetchAllAccountAndAssignAccount = async () => {
            try {
                const account = await axios.get(`${account_base_url}/assignaccount/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log(account?.data)
            setAssignAccount(account?.data?.assignAccount)
            } catch (error) {
             console.log(error)
        }
    }

    fetchAllAccountAndAssignAccount()
    }, [token])

    return (
        <UserFetchAssignAccountContext.Provider value={AssignAccount}>
            {children}
        </UserFetchAssignAccountContext.Provider>
    )
}