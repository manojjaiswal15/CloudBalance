import axios from "axios";
import { toast } from "react-toastify";



axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.clear("token")
      toast.error("JWT Expired Token")
      setTimeout(() =>
        window.location.href = "/"
        , 500)
    }
    return Promise.reject(error);
  }
);
