"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeople = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dotenvPath = path_1.default.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv_1.default.config({
    path: dotenvPath,
});
// import { books } from './model';
const swapi_1 = require("./controller/swapi");
const swapiController = new swapi_1.SwapiController();
exports.getPeople = (event, context) => {
    return swapiController.getPeople(event, context);
};
// export const update: Handler = (event: any) => booksController.update(event);
// export const find: Handler = () => booksController.find();
// export const findOne: Handler = (event: any, context: Context) => {
//   return booksController.findOne(event, context);
// };
// export const deleteOne: Handler = (event: any) => booksController.deleteOne(event);
//# sourceMappingURL=handler.js.map