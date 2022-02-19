import axios, { AxiosInstance } from "axios";
import { translateAttribute, translateGoogle } from "./functions";

export class Axios {
  static config(): AxiosInstance {
    const instance = axios.create({
      baseURL: process.env.SWAPI_URL,
    });

    instance.defaults.timeout = 2500;

    // Add a request interceptor
    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    instance.interceptors.response.use(
      async (response) => {
        const { data } = response;
        const promises = [];
        let dataTransform = {};

        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            promises.push(translateGoogle(key, value));
          }
        }
        const result = await Promise.all(promises);
        for (let i = 0; i < result.length; i++) {
          const element = result[i];
          dataTransform[element.key] = element.value;
        }

        return dataTransform;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }
}
