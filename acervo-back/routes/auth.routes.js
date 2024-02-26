const router = require('express').Router();
const UserAuth = require('../models/UserAuth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const fileUploader = require('../config/cloudinary.config');

const saltRounds = 10;

// Create a new user Sign Up
router.post('/signup', async (req, res, next) => {
  const { name, email, password, photoUrl } = req.body;

  try {
    // Check if the email or password or name is provided as an empty string
    if (email === '' || password === '' || name === '') {
      res.status(400).json({ message: 'All fields are mandatory' });
    }
    // user regex to validate email format
    const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Provide a valid email address' });
    }

    // Use regex to validate the password format
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must have at least 6 characters and contain one number and one lowercase',
      });
    }

    // check if the user exists
    const userExists = await UserAuth.findOne({ email: email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'The provided email is already register' });
    }

    // Encrypt the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // create the user
    const newUser = await UserAuth.create({
      name,
      email,
      password: hashedPassword,
      photoUrl,
    });
    res.json({
      name: newUser.name,
      email: newUser.email,
      photoUrl: newUser.photoUrl,
      _id: newUser._id,
    });
  } catch (error) {
    console.log('Error creating the user', error);
    next(error);
  }
});
// User Login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if email or password are provided as empty string
    if (email === '' || password === '') {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }
    // Check the users collection
    const user = await UserAuth.findOne({ email });

    if (!user) {
      // If the user is not found
      return res
        .status(400)
        .json({ message: 'Provided email is not registered' });
    }

    // Compare the provided password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      //create a payload for the JWT with the user info
      const payload = { _id: user._id, email: user.email, name: user.name };

      // Create and sign the token
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '6h',
      });
      res.status(200).json({ authToken });
    } else {
      return res.status(401).json({ message: 'Unable to authenticate user' });
    }
  } catch (error) {
    next(error);
  }
});

// User Verify - verify the JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {
  console.log('req.payload', req.payload);
  res.json(req.payload);
});

// Router to upload user image
router.post('/upload', fileUploader.single('file'), (req, res, next) => {
  try {
    console.log('file is:', req.file);
    res.status(200).json({ photoUrl: req.file.path });
  } catch (error) {
    console.log('An error occurred uploading the image', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});
module.exports = router;
