import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:8080/api' });

export default boot(({ app,store,router}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  api.interceptors.response.use(response => {
    return  response
  }, error => {
    if (error.response.status===401){
      store.commit('auth/setToken', undefined)
      store.commit('auth/setUser', undefined)
        void router.push('/login')
        return Promise.reject(error);
    }else{
      return Promise.reject(error);
    }
  })

  api.interceptors.request.use(requesst => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    requesst.headers['Authorization'] = `Bearer ${store.state.auth.token}`;
    return requesst
  })
  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
