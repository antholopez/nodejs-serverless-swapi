import { APIGatewayProxyEvent } from 'aws-lambda';
import { MessageUtil } from '../utils/message';
import { SwapiService } from '../service/swapi';

export class SwapiController extends SwapiService {
  async getPerson (event: APIGatewayProxyEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findPerson(id);

      return MessageUtil.success(200, result);
    } catch (err) {
      console.log(err)

      return MessageUtil.error(err.code, err.message);
    }
  }

  async getPeople(event: APIGatewayProxyEvent) {
    const search = event.queryStringParameters?.search;
    try {
      const result = await this.listPeople(search);

      return MessageUtil.success(200, result);
    } catch (err) {
      console.log(err)

      return MessageUtil.error(err.code, err.message);
    }
  }

  async createSpecie(event: APIGatewayProxyEvent) {
    try {
      
      const body = JSON.parse(event.body)

      return MessageUtil.success(201, body);
    } catch (err) {
      console.log(err)

      return MessageUtil.error(err.code, err.message);
    }
  }
}
