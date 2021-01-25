type Params = {
  [key: string]: string
};

export function preparePostParams(params: Params): URLSearchParams {
  let postParams = new URLSearchParams();
  for (let param in params) {
    postParams.append(param, params[param]);
  }
  return postParams;
};