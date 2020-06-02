import Methods from "./Methods";

export default interface APIModel {
  APIBase: string,
  APIVehicles: string,
  APIJobs: string,
  methods: Methods,
  headers: Headers,
};

export default class APIModel {
  constructor(apiBase: string, apiVeh: string, apiJ: string, methods: object, head: object) {
    this.APIBase = apiBase;
    this.APIVehicles = apiVeh;
    this.APIJobs = apiJ;
    this.methods = methods as Methods;
    this.headers = head as Headers;
  }
}