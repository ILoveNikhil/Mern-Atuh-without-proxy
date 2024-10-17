const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SignupRequest':
    case 'LoginRequest':
    case 'LoadUserRequest':
      return { ...state, loading: true };

    case 'SignupSuccess':
    case 'LoginSuccess':
    case 'LoadUserSuccess':
      return { ...state, loading: false, isAuthenticated: true, user: action.payload };

    case 'LogoutSuccess':
      return { ...state, isAuthenticated: false, user: null };

    case 'SignupFailure':
    case 'LoginFailure':
    case 'LoadUserFailure':
    case 'LogoutFailure':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
