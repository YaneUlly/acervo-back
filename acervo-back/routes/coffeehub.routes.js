const router = require('express').Router();
const CoffeeHub = require('../models/CoffeeHub.model');
const mongoose = require('mongoose');
const CoffeeTaste = require('../models/CoffeeTaste.model');

// Get all Coffees
router.get('/coffeehub', async (req, res, next) => {
  try {
    const allCoffees = await CoffeeHub.find({}).populate('coffeeTaste');
    res.status(200).json(allCoffees);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
