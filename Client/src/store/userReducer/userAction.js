import axios from "axios";
import { user_base_url } from "../../Service/authService";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_FAIL = 'LOGIN_FAIL';

// const users = [
//   { id: 1, email: 'manoj@gmail.com', password: '1234', role: 'admin' },
//   {id:2 , email: 'readonly@gmail.com',password:'1234', role:'readonly'},
//   {id:2 , email: 'customer@gmail.com',password:'1234', role:'customer'}
// ];

// export const login = async (email, password) => {
//   return async (dispatch) => {
//   try {
//     const response = await axios.post(`${user_base_url}/login`, { email, password });

//     console.log(response.data)
//     const { firstName, role } = response.data;

//     // if (found) {
//     dispatch({
//       type: LOGIN,
//       payload: {
//         user: {
//           // email: found.email,
//           // role: found.role,
//           role, firstName
//         }
//       }
//   })
//   }
  

//   catch (error) {
//     dispatch( {
//       type: LOGIN_FAIL,
//       payload: "Invalid User" || error
//     })
//   }
// };
// }
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post( `${user_base_url}/login`, { email, password });
      console.log(response)
      
       if (!response.data || !response.data.role) {
        throw new Error("Invalid credentials");
      }

      const { firstName, role,token } = response.data;

      dispatch({
        type: LOGIN,
        payload: {
          user: { firstName, role, token },
        },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: "Invalid Email or Password",
      });
    }
  };
};


export const logout = () => ({ type: LOGOUT });

