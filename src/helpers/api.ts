import  { AxiosError } from "axios";
import axiosInstance from "./axios";

/**
 * Defines a set of request methods to indicate the desired action to be performed for a given resource
 * @method The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
 * @method The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
 * @method The PUT method replaces all current representations of the target resource with the request payload
 * @method The DELETE method deletes the specified resource.
 */
type RequestMethodType = "GET" | "POST" | "PUT" | "DELETE";


// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => response,
//   async (error: AxiosError): Promise<any> => {
//     try {
      // const originalRequest: AxiosRequestConfig = error.config;
      // if (error.response && error.response.status === 401) {
        // const stateFromStore = store.getState();
        // const credentials: any = await auth0.auth
        //   .refreshToken({
        //     refreshToken: stateFromStore.AuthStore.session.refreshToken || "",
        //     scope
        //   });
        // store.dispatch(refreshTokenSuccess(credentials));
      //   originalRequest.headers.Authorization = `${credentials.tokenType} ${credentials.accessToken}`;
      //   return axios(originalRequest);
      // } else {
      //   return Promise.reject(error);
      // }
//     } catch (e) {
//       return Promise.reject(error);
//     }
//   }
// );

export class ApiError extends Error {
  public status?: number;

  constructor(status?: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export interface IApiResponse<T = any> {
  data: T;
}

/**
 * Set authorization token for all apis
 *
 * @param {string} token An authorization token from server
 */
export function setAuthorizationHeader(token: string, type: string): void {
  axiosInstance.defaults.headers.common.Authorization = `${type} ${token}`;
}

/**
 * Handle all errors from server and application
 *
 * @param {Error} error An error from axios library
 * @return {Object}
 */
export function handlingErrors(error: AxiosError): ApiError {
  let message: string | undefined;
  let status: number | undefined;

  try {
    // Sentry.captureException(error);

    if (error.response) {
      // tslint:disable-next-line:no-console
      console.log("API_ERROR", error.response);

      // if (error.response.status === 401) {
      //   store.dispatch(logout());
      // }

      message = error.response.data.description;
      status = error.response.status;
    } else {
      message = error.message;
    }
  } catch (e) {
    message = e.message;
  }

  return new ApiError(status, message);
}

/**
 * As middleware for API calling
 *
 * @param {string} url URL endpoint
 * @param {RequestMethodType} method Rest API method
 * @param {Object} data Body of rest API
 * @param {Object} headers Header of rest API
 * @return {Promise}
 */
export default <T>(
  url: string,
  method: RequestMethodType,
  data?: {},
  headers?: {}
): Promise<IApiResponse<T>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.request({
        data,
        headers: {
          ...axiosInstance.defaults.headers.common,
          ...headers
        },
        method,
        url
      });

      resolve({ data: response.data });
      // }
    } catch (e) {
      reject(handlingErrors(e));
    }
  });
};
