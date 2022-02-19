import { Context } from 'aws-lambda';
// import { Model } from 'mongoose';
import { MessageUtil } from '../utils/message';
import { SwapiService } from '../service/swapi';
// import { CreateBookDTO } from '../model/dto/createBookDTO';

export class SwapiController extends SwapiService {

  async getPeople (event: any, context?: Context) {
    // console.log('functionName', context.functionName);
    const id: number = Number(event.pathParameters.id);
    console.log('Viendo id: ', id)

    try {
      const result = await this.findPeople(id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
