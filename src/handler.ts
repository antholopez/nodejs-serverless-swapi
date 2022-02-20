
import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
import dotenv from 'dotenv';
dotenv.config();

import { SwapiController } from './controller/swapi';
const swapiController = new SwapiController();

export const getPeople: Handler = (event: APIGatewayProxyEvent) => {
  return swapiController.getPeople(event);
};
