import Interceptor from "../axios/axios";


const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const apiRequest = (method, url, data = null) => {
  console.log(method, url, data);
  return Interceptor({
    method,
    url,
    data
  });
};


export const requestAction = (type) => () => ({
  type,
});

export const successAction = (type) => (data) => ({
  type,
  payload: data,
});

export const failureAction = (type) => (error) => ({
  type,
  payload: error,
});



export const createLogoutAPIThunkRedux = (requestType, successType, failureType) => {
  return (method, url, data = null) => {
    return (dispatch) => {
      const request = requestAction(requestType);
      const success = successAction(successType);
      const failure = failureAction(failureType);

      dispatch(request());

      return apiRequest(method, url, data)
        .then((response) => {
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(failure(error.message));
        });
    };
  };
}



export const logout_request = 'logout_request';
export const logoutsuccess = 'logoutsuccess';
export const logoutfail = 'logoutfail';


const logoutApiReducerRedux = (state = initialState, action) => {
  switch (action.type) {
    case logout_request:
      return {
        ...state,
        loading: true,
        error: null
      };

    case logoutsuccess:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case logoutfail:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default logoutApiReducerRedux;
