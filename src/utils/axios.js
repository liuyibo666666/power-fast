/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/30
  * Time: 16:47
  * describe:
  */
import Vue from 'vue';
import axios from 'axios';

// 创建实例
const requestObj = axios.create({});

// 请求拦截器
requestObj.interceptors.request.use(config => {
  return config;
}, err => {
  // 请求错误一般http状态码以4开头，常见：401超时，404 not found
  return Promise.reject(err);
});

// 响应拦截器
requestObj.interceptors.response.use(res => {
  return res;
}, err => {
  // 响应错误处理一般http状态码以5开头，常见：500系统错误，502系统重启
  return Promise.reject(err);
});

/**
 * 登录超时提示框
 */
function loginOverdue() {
  Vue.prototype.$alert('很抱歉，登录已过期，请重新登录', '登录已过期', {
    confirmButtonText: '重新登录',
    type: 'error',
    callback: () => {
      Vue.prototype.$router.push({
        path: '/user/login',
        query: {
          redirect: this.$route.path
        }
      });
    }
  });
}

export function request(settings) {
  return requestObj({
    baseURL: settings.baseURL || '',
    url: settings.url || '',
    method: settings.method || 'get',
    headers: settings.headers || '',
    data: settings.data || {},
    params: settings.params || {},
    responseType: settings.responseType || 'json'
  }).then((response) => {
    return new Promise((resolve, reject) => {
      // 登录过期
      if (response.data.code === 106) {
        loginOverdue();
        reject(response.data.message);
      }
        resolve(response);
    });
  });
}
