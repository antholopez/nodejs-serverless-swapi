// import translatev2 from "translate-google";
const { Translate } = require("@google-cloud/translate").v2;

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS)
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

export const translateGoogle = async (parameter: string, value: string) => {
  console.log(process.env.GOOGLE_CREDENTIALS)
  const [translation] = await translate.translate(parameter, "es");
  return { key: translation, value };
};

const cleanKey = (key: string) => {
  return key.toLowerCase();
}

// const translateAttribute = async (parameter: string, value: string) => {
//   let translation = await translatev2(parameter, { to: "es" });
//   return { key: translation, value };
// };

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
