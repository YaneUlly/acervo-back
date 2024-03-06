const { Schema, model } = require('mongoose');

const coffeeTasteSchema = new Schema({
  createdBy: [{ type: Schema.Types.ObjectId, ref: 'UserAuth' }],
  coffeeName: { type: String, required: true },
  region: {
    type: String,
    enum: ['central america', 'south america', 'asia', 'africa', 'arabia'],
    required: true,
  },
  country: String,
  roast: {
    type: String,
    enum: ['light roast', 'medium roast', 'dark roast'],
    required: true,
  },
  caffeine: { type: String, enum: ['regular', 'decaf'], required: true },
  method: String,
  varieties: [String],
  altitude: [String],
  process: [String],
  aromas: [String],
  flavor: {
    type: String,
    enum: [
      'sweet',
      'floral',
      'fruity',
      'sour/fermented',
      'green/vegetative',
      'roasted',
      'spices',
      'nutty/cocoa',
    ],
    required: true,
  },
  body: { type: String, enum: ['aquoso', 'unctuous', 'fatty'] },
  recipe: String,
  description: String,
  share: { type: Boolean, default: false },
  storeUrl: String,
  coffeeImgUrl: {
    type: String,
    default:
      'https://i.pinimg.com/originals/15/79/15/157915e18cbeb48505a1cdb78bf8a0e8.jpg',
  },
});

module.exports = model('CoffeeTaste', coffeeTasteSchema);
