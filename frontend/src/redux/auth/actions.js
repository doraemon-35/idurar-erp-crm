import * as actionTypes from './types';
import * as authService from '@/auth';
import { request } from '@/request';

import history from '@/utils/history';

export const login =
  ({ loginData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
    });
    const data = await authService.login({ loginData });

    if (data.success === true) {
      window.localStorage.setItem('isLoggedIn', true);
      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: false,
      };
      window.localStorage.setItem('auth', JSON.stringify(auth_state));
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      });
      history.push('/');
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
      });
    }
  };

export const logout = () => async (dispatch) => {
  authService.logout();
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
  window.localStorage.removeItem('isLoggedIn');
  window.localStorage.removeItem('auth');
  history.push('/login');
};

export const updateProfile =
  ({ entity, id, jsonData }) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      payload: null,
    });

    let data = await request.updateAndUpload({ entity, id, jsonData });

    if (data.success === true) {
      window.localStorage.setItem('auth', JSON.stringify(data.result));
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        payload: null,
      });
    }
  };
