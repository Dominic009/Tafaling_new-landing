import { AuthJwtPayload } from "@/context/AuthContext/AuthProvider";
import {
  getAccessToken,
  getRefreshToken,
  setTokenInLS,
} from "@/helpers/tokenStorage";
import axios, { AxiosInstance } from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://99.237.86.169:7070/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async req => {
    if (req.url === "auth/login" || req.url === "auth/register") {
      return req;
    }

    let isExpired = false;

    if (getAccessToken()) {
      const decodedToken = jwtDecode<AuthJwtPayload>(getAccessToken());
      isExpired = dayjs.unix(decodedToken.exp as number).diff(dayjs()) < 1;
    }

    // console.log(
    //   `${isExpired === true ? 'token is expired' : 'token is valid'}`
    // );

    if (!isExpired) return req;

    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_TAFALING_API}/auth/refresh`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      })
      .catch(err => {
        localStorage.removeItem("auth-token");
        toast.error("session expired, please login again.");
        setTimeout(() => {
          window.location.href = "login";
        }, 2000);
        return req;
      });

    const { data } = await response.data;
    setTokenInLS(data);
    req.headers.Authorization = `Bearer ${data.access_token}`;

    return req;
  },
  err => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  response => response,
  error => {
    // Redirect to login page
    if (error.response?.status === 401) {
      toast.error("Session expired, please login again.");
      window.location.href = "login"; // Adjust the login page route if necessary
    }

    if (
      error.code === "ERR_NETWORK" &&
      error.message.includes("Network Error")
    ) {
      console.log("Request timed out");
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
