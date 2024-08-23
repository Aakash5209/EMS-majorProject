import Interceptor from "../axios/axios";


const initialState = {
  data: null,
  loading: false,
  error: null,
};


// Generic API utility function
export const apiRequest = (method, url, data = null) => {
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



export const createAcceptSalaryApprovalAPIThunk = (requestType, successType, failureType) => {
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



export const acceptsalaryreq = 'acceptsalaryreq';
export const acceptsalarysuc = 'acceptsalarysuc';
export const acceptsalaryfail = 'acceptsalaryfail';

const acceptSalaryApprovalApiReducerRedux = (state = initialState, action) => {
  switch (action.type) {
    case acceptsalaryreq:
      return {
        ...state,
        loading: true,
        error: null
      };

    case acceptsalarysuc:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case acceptsalaryfail:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default acceptSalaryApprovalApiReducerRedux;
