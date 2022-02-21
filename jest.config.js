const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });

module.exports = {
  preset: "@shelf/jest-dynamodb",
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "tests",
  testRegex: ".*\\.test\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};
