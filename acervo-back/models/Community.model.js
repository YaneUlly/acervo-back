const { Schema, model } = require('mongoose');

const communitySchema = new Schema({
  coffeeTaste: { type: Schema.Types.ObjectId, ref: 'CoffeeTaste' },
});

module.exports = model('Community', communitySchema);
