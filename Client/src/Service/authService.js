import axios from "axios";


export const user_base_url="http://localhost:8080/admin"

// //  user table details
// export async function userTableDetails() {
//       try {
//         const response = await axios.get(
//           `${user_base_url}/users`
//         );
//         setUserTableDetails(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Failed to fetch users", error);
//       }
//     }