
# NodeJS-APIRest-Serverless-Swapi

This is REST API example for AWS Lambda By Serverless framework with TypeScript and DynamoDB.


## Run Locally

Clone the project

```bash
  git clone https://github.com/antholopez/nodejs-serverless-swapi.git
```

Go to the project directory

```bash
  cd nodejs-serverless-swapi
```

Install dependencies

```bash
  npm install
```

Start the serverless

```bash
  npm run local
```

The expected result should be similar to:

```
> nodejs-apirest-serverless-swapi@1.0.0 local /home/anthonylopez/Desarrollo/Me/NestJS/Indra/nodejs-serverless-swapi
> rm -rf .build && serverless offline --stage development

Compiling with Typescript...
Using local tsconfig.json
Typescript compiled.
Watching typescript files...
Starting Offline: development/us-east-1.

Routes for getPerson:
GET /person/{id}
POST /{apiVersion}/functions/nodejs-apirest-serverless-swapi-development-getPerson/invocations

Routes for getPeople:
GET /people
POST /{apiVersion}/functions/nodejs-apirest-serverless-swapi-development-getPeople/invocations

Routes for createSpecie:
POST /specie
POST /{apiVersion}/functions/nodejs-apirest-serverless-swapi-development-createSpecie/invocations

Routes for getSpecie:
GET /species/{id}
POST /{apiVersion}/functions/nodejs-apirest-serverless-swapi-development-getSpecie/invocations

Routes for getSpecies:
GET /species
POST /{apiVersion}/functions/nodejs-apirest-serverless-swapi-development-getSpecies/invocations

Offline [HTTP] listening on http://localhost:3000
Enter "rp" to replay the last request
```


## Deployment

To deploy this project run

```bash
  npm run deploy
```

The expected result should be similar to:

```
> nodejs-apirest-serverless-swapi@1.0.0 deploy /home/anthonylopez/Desarrollo/Me/NestJS/Indra/nodejs-serverless-swapi
> serverless deploy --stage production


Deploying nodejs-apirest-serverless-swapi to stage production (us-east-1)
Compiling with Typescript...
Using local tsconfig.json
Typescript compiled.

✔ Service deployed to stack nodejs-apirest-serverless-swapi-production (126s)

endpoints:
  GET - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/person/{id}
  GET - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/people
  POST - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/specie
  GET - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/species/{id}
  GET - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/species
functions:
  getPerson: nodejs-apirest-serverless-swapi-production-getPerson (29 MB)
  getPeople: nodejs-apirest-serverless-swapi-production-getPeople (29 MB)
  createSpecie: nodejs-apirest-serverless-swapi-production-createSpecie (29 MB)
  getSpecie: nodejs-apirest-serverless-swapi-production-getSpecie (29 MB)
  getSpecies: nodejs-apirest-serverless-swapi-production-getSpecies (29 MB)
```

## Test

To tests this project run

```bash
  npm run test
```

The expected result should be similar to:

```
> nodejs-apirest-serverless-swapi@1.0.0 test /home/anthonylopez/Desarrollo/Me/NestJS/Indra/nodejs-serverless-swapi
> NODE_ENV=test jest

 PASS  tests/handler.test.ts (7.931 s)
  GET PERSON
    ✓ get person for id (1972 ms)
  GET PEOPLE
    ✓ get all people (3605 ms)
    ✓ get all people with search (934 ms)
  SPECIES
    ✓ create Specie (152 ms)
    ✓ get all Species (53 ms)
    ✓ get Specie (22 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        7.989 s, estimated 8 s
Ran all test suites.
```


## API Reference

#### Get person

```http
  GET - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/person/{id}
```

#### Get people

```http
  GET - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/people
```

#### Create specie

```http
  POST - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/specie
```
JSON Body

```json
  {
    "name": "Yoda's species",
    "classification": "mammal",
    "designation": "sentient",
    "average_height": "66",
    "skin_colors": "green, yellow",
    "hair_colors": "brown, white",
    "eye_colors": "brown, green, yellow",
    "average_lifespan": "900",
    "homeworld": "https://swapi.py4e.com/api/planets/28/",
    "language": "Galactic basic",
    "people": [
      "https://swapi.py4e.com/api/people/20/"
    ],
    "films": [
      "https://swapi.py4e.com/api/films/2/",
      "https://swapi.py4e.com/api/films/3/",
      "https://swapi.py4e.com/api/films/4/",
      "https://swapi.py4e.com/api/films/5/",
      "https://swapi.py4e.com/api/films/6/"
    ],
    "url": "https://swapi.py4e.com/api/species/6/"
  }
```

#### Get specie

```http
  GET - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/species/{id}
```

#### Get species

```http
  GET - https://rv67aey0e4.execute-api.us-east-1.amazonaws.com/production/species
```


