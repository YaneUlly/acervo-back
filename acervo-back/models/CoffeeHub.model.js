const { Schema, model } = require('mongoose');

const coffeeHubSchema = new Schema({
  coffeeTaste: { type: Schema.Types.ObjectId, ref: 'CoffeeTaste' },
});

module.exports = model('CoffeeHub', coffeeHubSchema);
