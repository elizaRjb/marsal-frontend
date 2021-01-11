import { request } from 'services/httpService';

class AuthApi {
  static login(data) {
    const url = '/users/login';

    return request(url, 'post', data);
  }
}

export default AuthApi;
