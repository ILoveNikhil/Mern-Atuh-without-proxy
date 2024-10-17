import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile, logoutUser } from '../redux/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(loadUserProfile());
    }
  }, [dispatch, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  ) : (
    <p>Please log in</p>
  );
};

export default Profile;
