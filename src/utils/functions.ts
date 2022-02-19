import translatev2 from "translate-google";
const { Translate } = require("@google-cloud/translate").v2;

const CREDENTIALS = {
  type: "service_account",
  project_id: "astute-harmony-341808",
  private_key_id: "fb171af28b87da82582946221a895deee1591062",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCfmEujyozljOfd\nb3uEkAvEGg2x+w08zrPlBugZBN707c4UZO/RHTjjxVeV8bysaPWg1xSvS4rJuWD/\nbUd2XTETfI8rN4x6h5zVDqkoV4NeHvV0d+blsCClm+Ibookxl1Cyfezo4GOwWVlK\ni2Obkeao5H142prYwF/fKhAmAtxvBUIodR8tkqKBT8wsRBGXuQ3z/tzxtJ51pAY8\nPhV5uMvwv6CpYQq4zLRW0ooXY4J3Vd6T+cz/uIIMdtmoNfHAYHNkI5DGYP0caZIA\nZvoyAKXXLhb+swr8BNjb6Xg6+x5W5+6GqR6iuHRJIAvKchv9yRFyjqYzDxiBL54G\nMkMB1OXtAgMBAAECggEAAzFxn/0TPRuI3xgWLVSRe7K2v+8hOGx9UnGFLsz3Zgil\nBSjw2GsAgqQl6LjduMhf08BB6HD3PaqBG5M06RQbwYNOPQPfQmtYsrWYolc/6F/v\nss0cWE+iE5YvG7TwkEayBWQ6G32z2OksvW5VB52PcyUhMowTKY+Ny4IEsTIA9ZKq\nAo4KgXooZCVXlkKso9NAfj2v0RyCFeEn2FIXEug2AvCuWSz6f73cmVmSQXTc0Hil\nuuu3OXCiCL5rXQB9V4geZngez9rOpqW6+BHBaj7WP0hZFhS8ZaCT1vITiiNPMMtD\nsiT+NMGnIKMi4FCbAN2izOAxEYFbuIeC3AApaJGQiQKBgQDVyRM5Q6cga1wE6GKn\nSfsTnIwHKZeEQSnLKctaLQZsr7uQO5S8iHbZYATr3zuj2MxWO8Tk8Ioh2ZkiliyU\njlYUv7biqN862Wk2gm1tsOWOv2J/DAdMQjN8CpYF+5ebLw6ldpRWHluGzLQE2Nhg\n0RpapU/3xWDRxFT4V+awnHIq5QKBgQC/G97V8ylfw1KqTT/hAXnHfBGMdkvShwOh\nn4RfP12CnEx9AbimfS/dXPmGZTtKkSvUeOs57evz3j3MRMb3YIOGgGZgtcQKHdUj\npUVA8uC3gLb5I6kQmq7ci3Lhu6K0MBstv3YvZ71xzDiUmGHhiyX4J2VAOr03Yo/k\n+6cB+dE2aQKBgHjjehZglinz65Xu3pJgeDTPyjLmpwInYv26RX5ZhY+CE9rshh/S\nPvqOnFnQ4sW0+18r7xvSlRmtFTYEm3Lpxe13t3AWNBzwAdnMCRsE89oziPv0jk/m\nA3z583mwmjsrcenI0vqbsf/Y01cGU9zzgSaO4lhmaWhU0AOamR13aeutAoGAUHQl\nPaDevCf4dyWKTOlYITkEEkQC66BXUQVcrtR4Q3IVaVL+L2joa6KmkYOwkFXJQ+ub\n64lUGhhnn8UcliwVctw/PVuIKlIg1p7PJuaY3+faH8x5cjoMf2BdftaFSqIt7vZ5\nhL+Bq5S0BSqZmmAAHhZHs+CGo/hkZ5vh1R0cjHECgYAHsSCnu7DJCBT5uurryx9G\nBOXZaTs1RaX693+blbDsZBHp6SrlRc74+fKiTw283KAwwNR6xBmds7WbkzawOTGW\nFprgf8U9XepSQpklrdgdhKZymfHLX1xx3McaN2KrufWt8y92CqBZdDgMYSIxXO80\nr2SDve3iCsJgyfy18jTR3g==\n-----END PRIVATE KEY-----\n",
  client_email: "translation-api@astute-harmony-341808.iam.gserviceaccount.com",
  client_id: "103091120679302257991",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/translation-api%40astute-harmony-341808.iam.gserviceaccount.com",
};

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

export const translateAttribute = async (parameter: string, value: string) => {
  console.log('1')
  const translation = await translatev2(parameter, { to: "es" });
  return { key: translation, value };
};

export const translateGoogle = async (parameter: string, value: string) => {
  console.log('2')
  const [translation] = await translate.translate(parameter, "es");
  return { key: translation, value };
};
