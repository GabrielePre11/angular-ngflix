import { writeFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

const targetPath = "./src/app/environments/environment.generated.ts";

const envConfigFile = `export const environment = {
  production: false,
  tmdbApiKey: '${process.env["TMDB_API_KEY"] || ""}',
  tmdbBaseUrl: '${
    process.env["TMDB_BASE_URL"] || "https://api.themoviedb.org/3"
  }'
};
`;

writeFileSync(targetPath, envConfigFile);
console.log("Environment file generated!");
process.exit(0);
