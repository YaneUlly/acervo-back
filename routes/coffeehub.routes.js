const router = require('express').Router();
const mongoose = require('mongoose');
const CoffeeTaste = require('../models/CoffeeTaste.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// Get all Coffees
router.get('/coffeehub', isAuthenticated, async (req, res, next) => {
  try {
    const allCoffees = await CoffeeTaste.find({ share: true }).populate(
      'createdBy',
      'name photoUrl'
    );
    res.status(200).json(allCoffees);
  } catch (error) {
    next(error);
  }
});

// Get details of a specific coffee
router.get('/coffeehub/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Coffee ID' });
    }
    const coffee = await CoffeeTaste.findById(id).populate(
      'createdBy',
      'name photoUrl'
    );
    if (!coffee) {
      return res.status(400).json({ message: 'Coffee not found' });
    }
    if (!coffee.share) {
      return res.status(403).json({ message: 'This coffee is not public' });
    }
    res.status(200).json(coffee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
