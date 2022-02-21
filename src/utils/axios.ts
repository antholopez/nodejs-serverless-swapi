import axios, { AxiosInstance } from "axios";
import { modelsAttributesEnglishToSpanish } from "./functions";

export class Axios {
  static config(): AxiosInstance {
    const instance = axios.create({
      baseURL: process.env.SWAPI_URL,
    });

    instance.defaults.timeout = 2500;

    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      async (response) => {
        const { data } = response;
        const translateData = await modelsAttributesEnglishToSpanish(data);
        return translateData;
      },
      (error) => {
        const { status, statusText } = error.response
        const response = {
          code: status, 
          message: statusText
        }
        throw response;
      }
    );

    return instance;
  }
}
