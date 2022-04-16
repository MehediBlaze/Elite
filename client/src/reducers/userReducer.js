const initialState = {
  loading: false,
  current: undefined,
  error: null,
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'REQUEST_AUTH':
      return { ...state, loading: true };
    case 'AUTH_SUCCESS':
      return { loading: false, current: action.payload, error: null };
    case 'AUTH_ERROR':
      return { loading: false, current: null, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
