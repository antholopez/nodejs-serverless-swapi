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

export const createSpecie: Handler = (event: APIGatewayProxyEvent) => {
  return swapiController.createSpecie(event);
};

export const getSpecie: Handler = (event: APIGatewayProxyEvent) => {
  return swapiController.getSpecie(event);
};

export const getSpecies: Handler = () => {
  return swapiController.getSpecies();
};