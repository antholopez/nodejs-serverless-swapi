import { validateOrReject } from "class-validator";
import moment from "moment-timezone";
import { IModel } from "../interface/model.inerface";
const { Translate } = require("@google-cloud/translate").v2;

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

export const validateInput = async (input: object): Promise<void> => {
  try {
    await validateOrReject(input, { validationError: { target: false } });
  } catch (errors) {
    let messages = [];
    for (const error of errors) {
      let { constraints } = error;
      for (const key in constraints) {
        if (Object.prototype.hasOwnProperty.call(constraints, key)) {
          const value = constraints[key];
          messages.push(value);
        }
      }
    }
    const allConstraints = messages.join(", ");
    throw {
      code: 400,
      message: allConstraints,
    };
  }
};

export const dateToString = (): string => {
  const timeZone = "America/Lima";
  return moment().tz(timeZone).format();
};

const cleanKey = (key: string): string => {
  let data = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  data = data.replace(/[^\w\s]/gi, "");
  data = data.toLowerCase();
  data = fixAttribute(data);
  return data;
};

const fixAttribute = (attr: string): string => {
  let [firstWord, ...otherWords] = attr.split(" ");
  firstWord = firstWord == "ano" ? "anio" : firstWord;

  if (firstWord === "pelicula") return firstWord + otherWords[0];

  if (otherWords.length) {
    for (let word of otherWords) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      firstWord += word;
    }
  }

  return firstWord;
};

export const translateGoogle = async (parameter: string, value: string): Promise<IModel> => {
  let [translation] = await translate.translate(parameter, "es");
  translation = translation ? cleanKey(translation) : translation;
  return { key: translation, value };
};

export const translateToSpanish = async (data: any): Promise<{}> => {
  const promises = [];

  let dataTransform = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      promises.push(translateGoogle(key, value));
    }
  }
  const result = await Promise.all(promises);
  for (let i = 0; i < result.length; i++) {
    const element = result[i];
    dataTransform[element.key] = element.value;
  }

  return dataTransform;
};

export const modelsAttributesEnglishToSpanish = async (data: any): Promise<any> => {
  if (data.results) {
    const results = data.results;
    if (!results.length) return results;

    const newResults = [];
    for (const result of results) {
      let translate = await translateToSpanish(result);
      newResults.push(translate);
    }
    return newResults;
  }

  return await translateToSpanish(data);
};
