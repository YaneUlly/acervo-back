const router = require('express').Router();
const mongoose = require('mongoose');
const PublicCoffeeTaste = require('../models/PublicCoffeeTaste.model');

// Route to handle the coffee recommendation
router.post('/coffeequiz', async (req, res) => {
  try {
    // User answers
    const { method, region, roast, caffeine, flavor } = req.body;
    console.log('User answers:', req.body);

    const recommendedCoffee = await PublicCoffeeTaste.findOne({
      method,
      region,
      roast,
      caffeine,
      flavor,
      share: true,
    });

    console.log('Recommended coffee:', recommendedCoffee);

    // If there is no filter criteria
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
