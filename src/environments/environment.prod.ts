import {SvFEEnvironment} from "./environment.interface";
import {LocalisationLanguages} from "@lib/localisation/localisation-language.enum";

export const environment: SvFEEnvironment = {
  production: false,
  defaultLanguage: LocalisationLanguages.English,
  availableLanguages: [LocalisationLanguages.English, LocalisationLanguages.Dutch],
  fibonacciApi: "localhost:3000",
  historyRefreshInSeconds: 1
};
