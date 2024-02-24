const { Schema, model } = require('mongoose');

const userAuthSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  photoUrl: { type: String, default: '' },
});

const UserAuth = model('UserAuth', userAuthSchema);

module.exports = UserAuth;
