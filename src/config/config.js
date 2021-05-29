class Config {
  _endpoint;
  _apiPath;

  getEnv() {
    return window.REACT_APP_ENV || process.env.REACT_APP_ENV;
  }

  endpoint() {
    return this._endpoint;
  }

  apiEndpoint() {
    return this.endpoint() + this.apiPath();
  }

  apiPath() {
    return this._apiPath;
  }

  constructor() {
    const env = this.getEnv();

    switch (env) {
      // More to be added here later
      case 'development':
        this._endpoint = 'http://localhost:8888';
        this._apiPath = '/api/v1';
        break;
      case 'dev':
        this._endpoint = 'https://marsal-backend.herokuapp.com';
        this._apiPath = '/api/v1';
        break;
      default:
        this._endpoint = 'http://localhost:8888';
        this._apiPath = '/api/v1';
        break;
    }
  }
}

export const config = new Config();
