import axios from 'axios';

import { config } from 'config/config';

/**
 * Http Utility.
 */
const http = axios.create({
  baseURL: config.apiEndpoint(),
});

export { http as default };
