const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
  coffeeTaste: { type: Schema.Types.ObjectId, ref: 'CoffeeTaste' },
  user: { type: Schema.Types.ObjectId, ref: 'UserAuth' },
});

module.exports = model('Wishlist', wishlistSchema);
