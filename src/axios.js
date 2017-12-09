import axios from 'axios';
import Raven from 'raven-js';

Raven.config(
  'https://d58ebf4f29804a69b54bad2f62fe1e68@sentry.io/160435',
).install();

axios.interceptors.response.use(
  response => response,
  error => {
    Raven.captureException(error);
    return Promise.reject(error);
  },
);

export default axios;
