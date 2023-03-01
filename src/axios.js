import axios from "axios";

export const httpClient = axios.create({
  baseURL: 'https://100.26.237.62:3000',
});
