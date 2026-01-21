import axios from "axios";
import { toast } from "react-toastify";


axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      toast.error("JWT Expired or Invalid Token");

      setTimeout(() => {
        window.location.href = "/";
      }, 500);

      return Promise.reject(error);
    }

    if (status === 403) {
      localStorage.removeItem("token");
      toast.error("You do not have permission");

      setTimeout(() => {
        window.location.href = "/";
      }, 500);

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
