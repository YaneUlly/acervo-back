const router = require('express').Router();
const mongoose = require('mongoose');
const CoffeeTaste = require('../models/CoffeeTaste.model');

// Get all Coffees
router.get('/coffeehub', async (req, res, next) => {
  try {
    const allCoffees = await CoffeeTaste.find({ public: true }).populate(
      'createdBy',
      'name photoUrl'
    );
    res.status(200).json(allCoffees);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
