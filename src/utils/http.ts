import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import config from 'config/env';
import { setStorage } from './storage';

class Http {
  private static handleResponse(res: AxiosResponse) {
    switch (res.status) {
      case 200:
        return res.data;
      case 304:
        return res.data;
      case 400:
        throw { message: res.data ? res.data : '请求错误' };
      case 401:
        throw { message: res.data ? res.data : '请求要求用户的身份认证' };
      case 404:
        throw { message: res.data ? res.data : '不存在的资源' };
      case 413:
        throw { message: res.data ? res.data : '上传的资源体积过大' };
      case 500:
        throw { message: res.data ? res.data : '服务器内部错误，无法完成请求' };
      case 501:
        throw { message: res.data ? res.data : '服务器不支持请求的功能，无法完成请求' };
      default:
        throw { message: res.data ? res.data : '未分类的错误: ' + res.status };
    }
  }
  private static handleError({ message }: { message: string }) {
    // 显示错误
    // 可以在这里将 redux 中的错误设置为 message 的值
    // 然后显示一个错误框
    // 然后在用户关闭错误框之后，将 redux 的错误信息情空
    console.log(message);
  }
  private localIp = config.localIP;
  private serverIp = config.serverIP;
  private isDevelopment: boolean = process.env.NODE_ENV === 'development';
  private get ip() {
    return this.isDevelopment ? this.localIp : this.serverIp;
  }
  public Get(apiUrl: string, query?: any, option?: AxiosRequestConfig) {
    return axios.get(this.ip + apiUrl, {
      params: query,
      timeout: 5000,
      ...option,
    })
      .then((res) => Http.handleResponse(res))
      .catch((err) => Http.handleError(err));
  }
  public Post(apiUrl: string, body: any, query?: any, option?: AxiosRequestConfig) {
    return axios.post(this.ip + apiUrl, body, {
      params: query,
      timeout: 5000,
      ...option,
    })
      .then((res) => Http.handleResponse(res))
      .catch((err) => Http.handleError(err));
  }
  public Put(apiUrl: string, body?: any, query?: any, option?: AxiosRequestConfig) {
    return axios.put(this.ip + apiUrl, body, {
      params: query,
      timeout: 5000,
      ...option,
    })
      .then((res) => Http.handleResponse(res))
      .catch((err) => Http.handleError(err));
  }
  public Delete(apiUrl: string, query?: any, option?: AxiosRequestConfig) {
    return axios.delete(this.ip + apiUrl, {
      params: query,
      timeout: 5000,
      ...option,
    })
      .then((res) => Http.handleResponse(res))
      .catch((err) => Http.handleError(err));
  }
}

axios.interceptors.response.use((response) => {
  if (response.data && response.data.type === 'GET_USER_INFO_FAIELD') {
    setStorage('user_id', null);
  }
  return response;
});

const http = new Http();

export default http;

export {
  Http,
};
