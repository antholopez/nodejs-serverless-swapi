// import translatev2 from "translate-google";
const { Translate } = require("@google-cloud/translate").v2;

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const cleanKey = (key: string) => {
  let data = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  data = data.replace(/[^\w\s]/gi, "");
  data = data.toLowerCase();
  data = fixAttribute(data);
  return data;
};

const fixAttribute = (attr: string) => {
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

export const translateGoogle = async (parameter: string, value: string) => {
  let [translation] = await translate.translate(parameter, "es");
  translation = translation ? cleanKey(translation) : translation;
  return { key: translation, value };
};

export const modelsAttributesEnglishToSpanish = async (data: any) => {
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
