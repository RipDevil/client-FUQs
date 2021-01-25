import axios from 'axios';
import { preparePostParams } from './params';

type Params = {
  [key: string]: string;
};

type methodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE';

export function call<RType>(url: string, method: methodTypes, params?: Params) {
  let config: object = {
    url,
    method,
  };

  if (params) {
    config = {
      ...config,
      ...(method === 'GET' ? { params } : { data: preparePostParams(params) }),
    };
  }

  return axios(config).then((res): RType => {
    logCall(url, method, config, res.data);
    return res.data
  });
}

function logCall(url: string, method: methodTypes, config: object, data:object) {
  if (process.env.NODE_ENV === 'development' && localStorage.getItem("api-debug")) {
    console.groupCollapsed(`API >> ${method} ${url}`);
    console.log('request:', config);
    console.log('data:', data);
    console.groupEnd();
  }
}