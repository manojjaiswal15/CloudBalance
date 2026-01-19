import axios from "axios";
import { user_base_url } from "../../Service/service";
import { jwtDecode } from "jwt-decode";
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post( `${user_base_url}/login`, { email, password });  
          
       if (!response.data) {
        throw new Error("Invalid credentials");
      }

      const { firstName,token,id } = response.data;
      const decoded = jwtDecode(token);

      dispatch({
        type: LOGIN,
        payload: {
          user: { firstName, role:decoded.roles, token, id },
        },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};



export const logout = () => ({ type: LOGOUT });

