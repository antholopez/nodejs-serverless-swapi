
import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
console.log(dotenvPath)
dotenv.config({
  path: dotenvPath,
});

import { SwapiController } from './controller/swapi';
const swapiController = new SwapiController();

export const getPeople: Handler = (event: APIGatewayProxyEvent) => {
  return swapiController.getPeople(event);
};
