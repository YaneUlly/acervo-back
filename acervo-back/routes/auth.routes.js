const router = require('express').Router();
const UserAuth = require('../models/UserAuth.model');

// Create a new user
router.post('/signup', async (req, res, next) => {
  const { name, email, password, photoUrl } = req.body;

  try {
    // check if the user exists
    const userExists = await UserAuth.findOne({ email: email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'The provided email is already register' });
    }
    // create the user
    const newUser = await UserAuth.create({
      name,
      email,
      password,
      photoUrl,
    });
    res.json({
      email: newUser.email,
      name: newUser.name,
      photoUrl: newUser.photoUrl,
      _id: newUser._id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
