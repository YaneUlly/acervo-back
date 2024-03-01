const { Schema, model } = require('mongoose');

const coffeeTasteSchema = new Schema({
  createdBy: [{ type: Schema.Types.ObjectId, ref: 'UserAuth' }],
  coffeeName: { type: String, required: true },
  region: { type: String, required: true },
  roast: String,
  method: String,
  varieties: [String],
  altitude: [Number],
  process: [String],
  aromas: [String],
  flavor: [String],
  body: { type: String, enum: ['aquoso', 'unctuous', 'fatty'] },
  recipe: String,
  description: String,
  public: { type: Boolean, default: false },
  storeUrl: String,
  coffeeImgUrl: {
    type: String,
    default:
      'https://i.pinimg.com/originals/15/79/15/157915e18cbeb48505a1cdb78bf8a0e8.jpg',
  },
});

module.exports = model('CoffeeTaste', coffeeTasteSchema);
