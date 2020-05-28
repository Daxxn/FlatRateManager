export default class APIControl {
  constructor(APIData) {
    this.APIData = APIData;
  }

  buildURL(endpoint, urlData) {
    const idURL = urlData !== undefined ? this.buildIDs(urlData) : '';
    return this.APIData.APIBase + endpoint + idURL;
  }

  buildIDs(urlData) {
    return '/' + urlData;
  }
}