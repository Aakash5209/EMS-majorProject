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



export const createColumnFilterAPIThunk = (requestType, successType, failureType) => {
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



export const columnFilterRequest = 'columnFilterRequest';
export const columnFilterSuccess = 'columnFilterSuccess';
export const columnFilterFail = 'columnFilterFail';

const getUserByColumnFilterApiReducerRedux = (state = initialState, action) => {
  switch (action.type) {
    case columnFilterRequest:
      return {
        ...state,
        loading: true,
        error: null
      };

    case columnFilterSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case columnFilterFail:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default getUserByColumnFilterApiReducerRedux;
