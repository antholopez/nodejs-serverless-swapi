"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapiController = void 0;
// import { Model } from 'mongoose';
const message_1 = require("../utils/message");
const swapi_1 = require("../service/swapi");
// import { CreateBookDTO } from '../model/dto/createBookDTO';
class SwapiController extends swapi_1.SwapiService {
    async getPeople(event, context) {
        // console.log('functionName', context.functionName);
        const id = Number(event.pathParameters.id);
        console.log('Viendo id: ', id);
        try {
            const result = await this.findPeople(id);
            return message_1.MessageUtil.success(result);
        }
        catch (err) {
            console.error(err);
            return message_1.MessageUtil.error(err.code, err.message);
        }
    }
}
exports.SwapiController = SwapiController;
//# sourceMappingURL=books.js.map