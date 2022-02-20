import { Axios } from "./../utils/axios";

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
      field = field || '';
      const people = await Axios.config().get(`people?search=${field}`);
      return people;
    } catch (err) {
      throw err;
    }
  }
}
