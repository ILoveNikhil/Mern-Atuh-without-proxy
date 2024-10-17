import axios from 'axios';

export const server = "http://localhost:5000";

// Signup User
export const signupUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'SignupRequest' });

    const { data } = await axios.post(
      `${server}/api/v1/user/signup`,
      { name, email, password },
      { withCredentials: true } // Ensures cookies are included
    );

    dispatch({ type: 'SignupSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'SignupFailure', payload: error.response.data.message });
  }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LoginRequest' });

    const { data } = await axios.post(
      `${server}/api/v1/user/login`,
      { email, password },
      { withCredentials: true }
    );

    dispatch({ type: 'LoginSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'LoginFailure', payload: error.response.data.message });
  }
};

// Load User Profile
export const loadUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: 'LoadUserRequest' });

    const { data } = await axios.get(`${server}/api/v1/user/me`, {
      withCredentials: true,
    });

    dispatch({ type: 'LoadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'LoadUserFailure', payload: error.response.data.message });
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true });
    dispatch({ type: 'LogoutSuccess' });
  } catch (error) {
    dispatch({ type: 'LogoutFailure', payload: error.response.data.message });
  }
};
