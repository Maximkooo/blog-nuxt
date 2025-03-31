import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 5000,
  });

  return {
    provide: {
      api
    }
  };
});
