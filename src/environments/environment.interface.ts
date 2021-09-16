export interface FxgEnvironment {
  production: boolean;
  defaultLanguage: string;
  availableLanguages: string[];
  endpoints: {
    auth: {
      signUp: string;
    }
  };
}
