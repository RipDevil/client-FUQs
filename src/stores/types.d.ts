export interface CRUDApi {
  get?: string;
  put?: string;
  post?: string;
  delete?: string;
}

export interface ConfigType {
  server: string;
  routes: {
    fuq?: string;
    badmin?: string;
    root?: string;
  };
  api: {
    fuq?: CRUDApi;
  };
}
