import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from './config'

const apiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  query(url, params = {}) {
    return Vue.axios.get(url, params);
  },

  post(url, data, params = {}) {
    return Vue.axios.post(url, data, params);
  },

  put(url, data, params = {}) {
    return Vue.axios.put(url, data, params);
  },

  delete(url, params = {}) {
    return Vue.axios.delete(url, params);
  }
};

export default apiService;