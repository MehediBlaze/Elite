const initialState = {
  loading: false,
  success: undefined,
  error: undefined,
  products: [],
  quantity: 0,
  totalPrice: 0,
};

const cartReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, loading: true };
    case 'CART_SUCCESS':
      return {
        loading: false,
        success: true,
        error: null,
        products: [...state.products, action.payload],
        quantity: state.quantity + 1,
        totalPrice: state.totalPrice + action.payload.price * action.payload.quantity,
      };
    case 'CART_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
