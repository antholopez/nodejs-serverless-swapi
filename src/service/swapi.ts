import { Axios } from "./../utils/axios";

export class SwapiService {
  protected async findPeople(id: number) {
    try {
      const people = await Axios.config().get(`people/${id}`);
      return people;
    } catch (err) {
      console.error(err.message);

      throw err;
    }
  }
}
