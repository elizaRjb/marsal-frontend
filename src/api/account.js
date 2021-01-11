import { request } from 'services/httpService';

class AccountApi {
  static signup(data) {
    const url = '/users/signup';

    return request(url, 'post', data);
  }
}

export default AccountApi;
