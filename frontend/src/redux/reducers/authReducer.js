/* eslint-disable import/no-anonymous-default-export */
import types from '../types';

const initialState = {
  checking: true,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case types.authLogin:
      return {
        ...state,
        ...payload,
        checking: false,
      };
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };
    case types.authLogout:
      return {
        checking: false,
      };
    default:
      return state;
  }
};
