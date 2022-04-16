import { publicRequest } from '../requestMethods';

const authenticate = async (dispatch, data, type) => {
  dispatch({ type: 'REQUEST_AUTH' });
  try {
    const resp = await publicRequest.post(`/auth/${type}`, data);
    dispatch({ type: 'AUTH_SUCCESS', payload: resp.data });
  } catch (err) {
    dispatch({ type: 'AUTH_ERROR', payload: err.message });
  }
};

export default authenticate;
