import Interceptor from "../axios/axios";


const initialState = {
  data: null,
  loading: false,
  error: null,
};


// Generic API utility function
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



export const createUpdateSalaryAPIThunkRedux = (requestType, successType, failureType) => {
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



export const updatesalaryrequest = 'updatesalaryrequest';
export const updatesalarysuccess = 'updatesalarysuccess';
export const updatesalaryfail = 'updatesalaryfail';


const updateSalaryApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case updatesalaryrequest:
      return {
        ...state,
        loading: true,
        error: null
      };

    case updatesalarysuccess:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case updatesalaryfail:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default updateSalaryApiReducer;
