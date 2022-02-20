import { Handler, APIGatewayProxyEvent } from "aws-lambda";
import dotenv from "dotenv";
dotenv.config();

import { SwapiController } from "./controller/swapi";
const swapiController = new SwapiController();

export const getPerson: Handler = (event: APIGatewayProxyEvent) => {
  return swapiController.getPerson(event);
};

export const getPeople: Handler = (event: APIGatewayProxyEvent) => {
  return swapiController.getPeople(event);
};
