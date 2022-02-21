import { Axios } from "../utils/axios";

import { DynamoDB } from "aws-sdk";
import { ISpecie } from "../interface/specie.interface";
import { AxiosResponse } from "axios";

const isTest = process.env.JEST_WORKER_ID;
const dynamodb =
  process.env.NODE_ENV === "test"
    ? new DynamoDB.DocumentClient({
        convertEmptyValues: true,
        ...(isTest && {
          endpoint: "localhost:8000",
          sslEnabled: false,
          region: "local-env",
        }),
      })
    : new DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_NAME;

export class SwapiService {
  protected async findPerson(id: number): Promise<AxiosResponse<any, any>> {
    try {
      const people = await Axios.config().get(`people/${id}`);
      return people;
    } catch (err) {
      throw err;
    }
  }

  protected async listPeople(field: string): Promise<AxiosResponse<any, any>> {
    try {
      field = field || "";
      const people = await Axios.config().get(`people?search=${field}`);
      return people;
    } catch (err) {
      throw err;
    }
  }

  protected async addSpecie(input: ISpecie): Promise<ISpecie> {
    try {
      let newSpecie = input;

      await dynamodb.put({ TableName, Item: newSpecie }).promise();

      return newSpecie;
    } catch (error) {
      throw error;
    }
  }

  protected async findSpecie(id: string): Promise<any> {
    try {
      const { Item } = await dynamodb
        .get({
          TableName,
          Key: { id },
        })
        .promise();

      const specie = Item || {};
      return specie;
    } catch (error) {
      throw error;
    }
  }

  protected async getAllSpecies(): Promise<any> {
    try {
      const { Items } = await dynamodb
        .scan({
          TableName,
        })
        .promise();

      const species = Items || [];
      return species;
    } catch (error) {
      throw error;
    }
  }
}
