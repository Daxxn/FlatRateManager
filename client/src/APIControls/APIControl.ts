import APIModel from "./DataModels/APIModel";

export default interface APIControl {
  APIData: APIModel,
};

export default class APIControl {
  constructor(APIData: APIModel|object) {
    this.APIData = APIData as APIModel;
  }

  /**
   * builds the API call string from the APi url, endpoint, and any param data.
   * @param {string} endpoint API endpoint
   * @param {string} urlData Optional params for API endpoint call
   * @returns {string} Full API URL
   */
  public buildURL(endpoint: string, urlData: string): string {
    const idURL = urlData !== undefined ? this.buildIDs(urlData) : '';
    return this.APIData.APIBase + endpoint + idURL;
  }

  /**
   * Builds a full URL from the base URL and the passed endpoint.
   * @param {string} endpoint API Endpoint
   * @returns Full API URL
   */
  buildPlainURL(endpoint: string): string {
    return this.APIData.APIBase + endpoint;
  }

  /**
   * Verry simple, adds a '/' to the front of a string.
   * Possibly need to add array functionality.
   * @param {string} urlData Data to be passed as params in the URL
   * @returns {string} Params URL
   */
  buildIDs(urlData: string): string {
    return '/' + urlData;
  }

  /**
   * Builds the GET data for the fetch request.
   * @returns {Object} ES6 object
   */
  buildGetMessage(): object {
    // return new FetchHead(this.APIData.methods.get, this.APIData.headers, {});
    return {
      method: this.APIData.methods.get,
      headers: this.APIData.headers,
    };
  }

  /**
   * Builds the POST data for the fetch request.
   * @param {Object} body ES6 json-convertable object
   * @returns {Object} Returns fetch request data
   */
  buildPostMessage(body: Object) {
    return {
      method: this.APIData.methods.post,
      headers: this.APIData.headers,
      body: JSON.stringify(body),
    };
  }

  buildPatchMessage(body: Object) {
    return {
      method: this.APIData.methods.patch,
      headers: this.APIData.headers,
      body: JSON.stringify(body),
    };
  }
}