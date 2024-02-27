const { Schema, model } = require('mongoose');

const userAuthSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  photoUrl: {
    type: String,
    default:
      'https://i.pinimg.com/originals/d8/e3/f8/d8e3f81a3094730df6424615c3838738.jpg',
  },
});

const UserAuth = model('UserAuth', userAuthSchema);

module.exports = UserAuth;
