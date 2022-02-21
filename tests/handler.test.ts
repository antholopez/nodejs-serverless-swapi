import LambdaTester from "lambda-tester";
import {
  getPeople,
  getPerson,
  createSpecie,
  getSpecies,
  getSpecie,
} from "../src/handler";
import { APIGatewayProxyEvent } from "aws-lambda";

let event: APIGatewayProxyEvent = {
  body: "",
  pathParameters: undefined,
  headers: undefined,
  multiValueHeaders: undefined,
  httpMethod: "",
  isBase64Encoded: false,
  path: "",
  multiValueQueryStringParameters: undefined,
  stageVariables: undefined,
  requestContext: undefined,
  resource: "",
  queryStringParameters: undefined,
};

describe("GET PERSON", () => {
  test("get person for id", async () => {
    event.pathParameters = { id: "1" };
    await LambdaTester(getPerson)
      .event(event)
      .expectResult((result: any) => {
        const { code, message, data } = JSON.parse(result.body);

        expect(result.statusCode).toEqual(200);
        expect(result.body).not.toBeNull();
        expect(code).toEqual(1);
        expect(message).toEqual("success");
        expect(data).not.toBeNull();
        expect(data.nombre).not.toBeUndefined();
      });
  }, 10000);
});

describe("GET PEOPLE", () => {
  test("get all people", async () => {
    event.queryStringParameters = { search: "" };
    await LambdaTester(getPeople)
      .event(event)
      .expectResult((result: any) => {
        const { code, message, data } = JSON.parse(result.body);

        expect(result.statusCode).toEqual(200);
        expect(result.body).not.toBeNull();
        expect(code).toEqual(1);
        expect(message).toEqual("success");
        expect(data).not.toBeNull();
      });
  }, 10000);
});

describe("GET PEOPLE", () => {
  test("get all people with search", async () => {
    event.queryStringParameters = { search: "luke" };
    await LambdaTester(getPeople)
      .event(event)
      .expectResult((result: any) => {
        const { code, message, data } = JSON.parse(result.body);

        expect(result.statusCode).toEqual(200);
        expect(result.body).not.toBeNull();
        expect(code).toEqual(1);
        expect(message).toEqual("success");
        expect(data).not.toBeNull();
      });
  }, 10000);
});

describe("SPECIES", () => {
  let specieId = "";
  test("create Specie", async () => {
    event.body = JSON.stringify({
      name: "Wookiee",
      classification: "mammal",
      designation: "sentient",
      average_height: "210",
      skin_colors: "gray",
      hair_colors: "black, brown",
      eye_colors: "blue, green, yellow, brown, golden, red",
      average_lifespan: "400",
      homeworld: "https://swapi.py4e.com/api/planets/14/",
      language: "Shyriiwook",
      people: [
        "https://swapi.py4e.com/api/people/13/",
        "https://swapi.py4e.com/api/people/80/",
      ],
      films: [
        "https://swapi.py4e.com/api/films/1/",
        "https://swapi.py4e.com/api/films/2/",
        "https://swapi.py4e.com/api/films/3/",
        "https://swapi.py4e.com/api/films/6/",
        "https://swapi.py4e.com/api/films/7/",
      ],
      url: "https://swapi.py4e.com/api/species/3/",
    });
    await LambdaTester(createSpecie)
      .event(event)
      .expectResult((result: any) => {
        const { code, message, data } = JSON.parse(result.body);

        specieId = data.id;
        expect(result.statusCode).toEqual(201);
        expect(result.body).not.toBeNull();
        expect(code).toEqual(1);
        expect(message).toEqual("success");
        expect(data).not.toBeNull();
        expect(specieId).not.toBeNull();
      });
  }, 10000);

  test("get all Species", async () => {
    await LambdaTester(getSpecies)
      .event(event)
      .expectResult((result: any) => {
        const { code, message, data } = JSON.parse(result.body);

        expect(result.statusCode).toEqual(200);
        expect(result.body).not.toBeNull();
        expect(code).toEqual(1);
        expect(message).toEqual("success");
        expect(data).not.toBeNull();
      });
  }, 10000);

  test("get Specie", async () => {
    event.pathParameters = { id: specieId };
    await LambdaTester(getSpecie)
      .event(event)
      .expectResult((result: any) => {
        const { code, message, data } = JSON.parse(result.body);

        expect(result.statusCode).toEqual(200);
        expect(result.body).not.toBeNull();
        expect(code).toEqual(1);
        expect(message).toEqual("success");
        expect(data).not.toBeNull();
      });
  }, 10000);
});
