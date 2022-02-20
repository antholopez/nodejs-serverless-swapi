import { APIGatewayProxyEvent } from 'aws-lambda';
import { MessageUtil } from '../utils/message';
import { SwapiService } from '../service/swapi';

export class SwapiController extends SwapiService {
  async getPeople (event: APIGatewayProxyEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findPeople(id);

      return MessageUtil.success(200, result);
    } catch (err) {
      console.log(err)

      return MessageUtil.error(err.code, err.message);
    }
  }
}
