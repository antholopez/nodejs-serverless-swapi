import { APIGatewayProxyEvent } from "aws-lambda";
import { MessageUtil } from "../utils/message";
import { SwapiService } from "../service/swapi.service";
import { CreateSpecieDto } from "../dto/create-specie.dto";
import { validateInput } from "../utils/functions";

export class SwapiController extends SwapiService {
  async getPerson(event: APIGatewayProxyEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findPerson(id);

      return MessageUtil.success(200, result);
    } catch (err) {
      console.log(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async getPeople(event: APIGatewayProxyEvent) {
    const search = event.queryStringParameters?.search;
    try {
      const result = await this.listPeople(search);

      return MessageUtil.success(200, result);
    } catch (err) {
      console.log(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async createSpecie(event: APIGatewayProxyEvent) {
    try {
      const body: CreateSpecieDto = JSON.parse(event.body);
      let specie = new CreateSpecieDto();
      specie.name = body.name;
      specie.classification = body.classification;
      specie.designation = body.designation;
      specie.average_height = body.average_height;
      specie.skin_colors = body.skin_colors;
      specie.hair_colors = body.hair_colors;
      specie.eye_colors = body.eye_colors;
      specie.average_lifespan = body.average_lifespan;
      specie.homeworld = body.homeworld;
      specie.language = body.language;
      specie.people = body.people;
      specie.films = body.films;
      specie.url = body.url;

      await validateInput(specie);

      const newSpecie = await this.addSpecie(specie);

      return MessageUtil.success(201, newSpecie);
    } catch (err) {
      console.log(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async getSpecie(event: APIGatewayProxyEvent) {
    const id = event.pathParameters.id;

    try {
      const specie = await this.findSpecie(id)
      return MessageUtil.success(200, specie);
    } catch (err) {
      console.log(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async getSpecies() {
    try {
      const species = await this.getAllSpecies()
      return MessageUtil.success(200, species);
    } catch (err) {
      console.log(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
