import axios from 'axios';
import types from './types';

export const action = () => {
  return async (dispatch) => {

    return dispatch({
      type: 'type',
      payload: 'payload',
    });
  };
};
