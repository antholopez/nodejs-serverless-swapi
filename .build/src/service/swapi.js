"use strict";
// import { Model } from 'mongoose';
// import { CreateBookDTO } from '../model/dto/createBookDTO';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapiService = void 0;
const axios_1 = require("./../utils/axios");
class SwapiService {
    async findPeople(id) {
        try {
            const people = await axios_1.Axios.config().get(`people/${id}`);
            return people;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
}
exports.SwapiService = SwapiService;
//# sourceMappingURL=swapi.js.map