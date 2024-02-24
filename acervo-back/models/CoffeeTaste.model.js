const { Schema, model } = require('mongoose');

const coffeeTasteSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'UserAuth' },
  coffeeName: { type: String, required: true },
  region: { type: String, required: true },
  roast: String,
  varieties: [String],
  altitude: [Number],
  process: [String],
  body: { type: String, enum: ['aquoso', 'unctuous', 'fatty'] },
  method: String,
  recipe: [String],
  description: [String],
  storeUrl: String,
  coffeeImgUrl: { type: String, default: '' },
});

module.exports = model('CoffeeTaste', coffeeTasteSchema);
