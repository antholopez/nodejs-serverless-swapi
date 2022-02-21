import { Axios } from "./../utils/axios";
// import { v4 } from "uuid";

import { DynamoDB } from "aws-sdk";
import { ISpecie } from "../interface/specie.interface";

const dynamodb = new DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_NAME;

export class SwapiService {
  protected async findPerson(id: number) {
    try {
      const people = await Axios.config().get(`people/${id}`);
      return people;
    } catch (err) {
      throw err;
    }
  }

  protected async listPeople(field: string) {
    try {
      field = field || "";
      const people = await Axios.config().get(`people?search=${field}`);
      return people;
    } catch (err) {
      throw err;
    }
  }

  protected async addSpecie(input: ISpecie) {
    try {
      let newSpecie = input;

      await dynamodb.put({ TableName, Item: newSpecie }).promise();

      return newSpecie;
    } catch (error) {
      throw error;
    }
  }

  protected async findSpecie(id: string) {
    try {
      const { Item } = await dynamodb
        .get({
          TableName,
          Key: { id },
        })
        .promise();

      const specie = Item || {}
      return specie;
    } catch (error) {
      throw error;
    }
  }

  protected async getAllSpecies() {
    try {
      const { Items } = await dynamodb
        .scan({
          TableName
        })
        .promise();

      const species = Items || []
      return species;
    } catch (error) {
      throw error;
    }
  }
}
