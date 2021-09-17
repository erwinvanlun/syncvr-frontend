// This file will be replaced for production by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SvFEEnvironment} from "./environment.interface";
import {LocalisationLanguages} from "@lib/localisation/localisation-language.enum";

export const environment: SvFEEnvironment = {
  production: false,
  defaultLanguage: LocalisationLanguages.English,
  availableLanguages: [LocalisationLanguages.English, LocalisationLanguages.Dutch],
  fibonacciApi: "http://localhost:3000/fibonacci",
  historyRefreshInSeconds: 1
};
