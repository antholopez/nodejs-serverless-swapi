"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axios = void 0;
const axios_1 = __importDefault(require("axios"));
const functions_1 = require("./functions");
class Axios {
    static config() {
        const instance = axios_1.default.create({
            baseURL: process.env.SWAPI_URL,
        });
        instance.defaults.timeout = 2500;
        // Add a request interceptor
        instance.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        // Add a response interceptor
        instance.interceptors.response.use(async (response) => {
            const { data } = response;
            const promises = [];
            let dataTransform = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const value = data[key];
                    promises.push(functions_1.translateGoogle(key, value));
                }
            }
            const result = await Promise.all(promises);
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                dataTransform[element.key] = element.value;
            }
            return dataTransform;
        }, (error) => {
            return Promise.reject(error);
        });
        return instance;
    }
}
exports.Axios = Axios;
//# sourceMappingURL=axios.js.map