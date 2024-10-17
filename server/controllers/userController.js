import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Cookie options
// const cookieOptions = {
//   maxAge: 90 * 24 * 60 * 60 * 1000,
//   sameSite: 'none',
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production', // Only secure in production
// };

// // Send token in a cookie
// const sendToken = (res, user, message) => {
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '90d',
//   });

//   res.status(200)
//     .cookie('gps_tracker_token', token, cookieOptions)
//     .json({ success: true, user, message });
// };

const cookieOptions = {
  maxAge: 90 * 24 * 60 * 60 * 1000,  // 90 days
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',  // 'None' for cross-site (production), 'Lax' for local
  httpOnly: true,  // Cookie accessible only by server
  secure: process.env.NODE_ENV === 'production',  // Secure only for HTTPS in production
};

export const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res
    .status(code)
    .cookie('gps_tracker_token', token, cookieOptions)
    .json({
      success: true,
      user,
      message,
    });
};


// Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    sendToken(res, user, 'Signup successful');
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    sendToken(res, user, 'Login successful');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Logout
export const logout = (req, res) => {
  res.status(200).cookie('gps_tracker_token', '', {
    maxAge: 0, // This effectively clears the cookie
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // 'None' for production, 'Lax' for local testing
    httpOnly: true, // Helps mitigate the risk of client-side script accessing the cookie
    secure: process.env.NODE_ENV === 'production', // True only in production to ensure the cookie is sent over HTTPS
  }).json({ success: true, message: 'Logged out' });
};




// Get Profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ success: true, user });
};
