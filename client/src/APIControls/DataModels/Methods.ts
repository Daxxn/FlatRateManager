export default interface Methods {
  get: string,
  post: string,
  patch: string,
  delete: string,
}

export default class Methods {
  get = 'GET';
  post = 'POST';
  patch = 'PATCH';
  delete = 'DELETE';
}