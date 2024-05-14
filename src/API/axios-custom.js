import axios from "axios";

const customAPI = axios.create({
  baseURL: " https://json-server-for-ecommerce-app-using-axios.onrender.com",  // this is the json server local URL http://localhost:9000
  header: {
    "Content-Type": "application/json",
  },
});

customAPI.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    await axios.post(" https://json-server-for-ecommerce-app-using-axios-another-url.onrender.com/tracking", {
      message: error.message,
      endPoint: error.config.url,
    });
    if (!error.config.url.includes("tracking") && !axios.isCancel(error)) {
    }

    return Promise.reject(error);
  }
);

export { customAPI };
