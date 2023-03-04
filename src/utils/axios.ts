import Axios from "axios";

import { getAuthToken } from "utils";

// eslint-disable-next-line import/no-cycle
import { ignoreRoutes } from "./apiCalls";

const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_PROD_BASE_URL}/${process.env.NEXT_PUBLIC_VERSION}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_VERSION}`,
});

export default axios;

axios.interceptors.request.use((config) => {
  if (!config.url) return config;

  const urlArr = config.url?.split("/").slice(0, 3);
  const url = urlArr.join("/");

  const accessToken = getAuthToken();

  if (config.url && ignoreRoutes.includes(url) === false) {
    config.withCredentials = true;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// axios.interceptors.response.use((config) => {
//   console.log(config);

//   return config;
// });
