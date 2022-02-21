import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import dotenv from "dotenv";
dotenv.config();

import { SwapiController } from "./controller/swapi.controller";
const swapiController = new SwapiController();

export const getPerson = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return await swapiController.getPerson(event);
};

export const getPeople = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return await swapiController.getPeople(event);
};

export const createSpecie = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return await swapiController.createSpecie(event);
};

export const getSpecie = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return await swapiController.getSpecie(event);
};

export const getSpecies = async (): Promise<APIGatewayProxyResult> => {
  return await swapiController.getSpecies();
};
