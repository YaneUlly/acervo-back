const router = require('express').Router();
const mongoose = require('mongoose');
const CoffeeTaste = require('../models/CoffeeTaste.model');

// Route to handle the coffee recommendation
router.post('/coffeequiz', async (req, res) => {
  try {
    // User answers
    const { method, region, flavor } = req.body;
    console.log(req.body);

    const recommendedCoffee = await CoffeeTaste.findOne({
      method,
      region,
      flavor: { $in: flavor },
      public: true,
    });

    // If there ir no filter criteria
    if (!recommendedCoffee) {
      return res.status(404).json({
        message: 'No coffee recommendation found for the given criteria',
      });
    }

    res.status(200).json({ recommendedCoffee });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Failed to fetch coffee recommendation' });
  }
});

module.exports = router;
