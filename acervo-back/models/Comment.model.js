const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  coffeeTaste: { type: Schema.Types.ObjectId, ref: 'CoffeeTaste' },
  user: { type: Schema.Types.ObjectId, ref: 'UserAuth' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Comment', commentSchema);
