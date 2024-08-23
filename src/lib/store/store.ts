import {configureStore} from '@reduxjs/toolkit'
import tabSlice from './features/tab/tabSlice';
import loginApiReducerRedux from './thunk/loginActionCreator';
import cookieCheckApiReducerRedux from './thunk/cookieCheckActionCreator';
import logoutApiReducerRedux from './thunk/LogoutActionCreator';
import getUserDataApiReducerRedux from './thunk/GetUserDataActionCreator';
import addUserApiReducer from './thunk/addUserActionCreator';
import getUserByRoleApiReducer from './thunk/getByRoleUserActionCreator';
import globalSearchUserApiReducerRedux from './thunk/GlobalSearchUserActionCreator';
import getUserByColumnFilterApiReducerRedux from './thunk/GetUesrByColumnFilterActionCreator';
import updateSalaryApiReducer from './thunk/UpdateSalaryActionCreator';
import approvalNotificationApiReducerReudux from './thunk/approvalNotificationActionCreator';
import acceptSalaryApprovalApiReducerRedux from './thunk/acceptSalaryApprovalActionCreator';
import rejectSalaryApiReducer from './thunk/rejectSalaryActionCreator';
import tempReducer from './thunk/temp';

export const makeStore = () => {
  return configureStore({
    reducer: { 
      tab: tabSlice,
      loginApiReducerRedux: loginApiReducerRedux,
      cookieCheckApiReducerRedux: cookieCheckApiReducerRedux,
      logoutApiReducerRedux:logoutApiReducerRedux,
      getUserDataApiReducerRedux:getUserDataApiReducerRedux,
      addUserApiReducer:addUserApiReducer,
      getUserByRoleApiReducer:getUserByRoleApiReducer,
      globalSearchUserApiReducerRedux:globalSearchUserApiReducerRedux,
      getUserByColumnFilterApiReducerRedux:getUserByColumnFilterApiReducerRedux,
      updateSalaryApiReducer:updateSalaryApiReducer,
      approvalNotificationApiReducerReudux:approvalNotificationApiReducerReudux,
      acceptSalaryApprovalApiReducerRedux:acceptSalaryApprovalApiReducerRedux,
      rejectSalaryApiReducer:rejectSalaryApiReducer
      // tempReducer:tempReducer
      
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']