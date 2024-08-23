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



export const createRejectSalaryAPIThunkRedux = (requestType, successType, failureType) => {
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



export const rejectreq = 'rejectreq';
export const rejectsuc = 'rejectsuc';
export const rejectfail = 'rejectfail';

const rejectSalaryApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case rejectreq:
      return {
        ...state,
        loading: true,
        error: null
      };

    case rejectsuc:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case rejectfail:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default rejectSalaryApiReducer;
