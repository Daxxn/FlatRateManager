
export default interface FetchHead {
  method: string,
  headers: object,
  body: string,
}

export default class FetchHead {
  constructor(method: string, header: object, body: object) {
    this.method = method;
    this.headers = header;
    this.body = JSON.stringify(body);
  }

  toObject() {
    return {
      method: this.method,
      headers: this.headers,
      body: this.body,
    };
  }
}