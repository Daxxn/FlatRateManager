export default class APIControl {
  constructor(APIData) {
    this.APIData = APIData;
  }

  /**
   * builds the API call string from the APi url, endpoint, and any param data.
   * @param {string} endpoint API endpoint
   * @param {string} urlData Optional params for API endpoint call
   * @returns {string} Full API URL
   */
  buildURL(endpoint, urlData) {
    const idURL = urlData !== undefined ? this.buildIDs(urlData) : '';
    return this.APIData.APIBase + endpoint + idURL;
  }

  /**
   * Builds a full URL from the base URL and the passed endpoint.
   * @param {string} endpoint API Endpoint
   * @returns Full API URL
   */
  buildPlainURL(endpoint) {
    return this.APIData.APIBase + endpoint;
  }

  /**
   * Verry simple, adds a '/' to the front of a string.
   * Possibly need to add array functionality.
   * @param {string} urlData Data to be passed as params in the URL
   * @returns {string} Params URL
   */
  buildIDs(urlData) {
    return '/' + urlData;
  }

  /**
   * Builds the GET data for the fetch request.
   * @returns {Object} ES6 object
   */
  buildGetMessage() {
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
  buildPostMessage(body) {
    return {
      method: this.APIData.methods.post,
      headers: this.APIData.headers,
      body: JSON.stringify(body),
    };
  }

  buildPatchMessage(body) {
    return {
      method: this.APIData.methods.patch,
      headers: this.APIData.headers,
      body: JSON.stringify(body),
    };
  }
}