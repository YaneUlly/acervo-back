const router = require('express').Router();
const CoffeeTaste = require('../models/CoffeeTaste.model');
const mongoose = require('mongoose');
const UserAuth = require('../models/UserAuth.model');

// Create a new coffee taste
router.post('/coffeetaste', async (req, res, next) => {
  const {
    coffeeName,
    region,
    roast,
    varieties,
    altitude,
    process,
    body,
    method,
    recipe,
    description,
    storeUrl,
    coffeeImgUrl,
  } = req.body;
  try {
    const newCoffeeTaste = await CoffeeTaste.create({
      createdBy: [],
      coffeeName,
      region,
      roast,
      varieties,
      altitude,
      process,
      body,
      method,
      recipe,
      description,
      storeUrl,
      coffeeImgUrl,
    });
    console.log('New Coffee Taste', newCoffeeTaste);
    res.status(201).json(newCoffeeTaste);
  } catch (error) {
    console.log('An error occured creating the coffee track', error);
    next(error);
  }
});

// Get all coffee track
router.get('/coffeetaste', async (req, res, next) => {
  try {
    const allCoffeeTaste = await CoffeeTaste.find({}).populate('createdBy');
    res.status(200).json(allCoffeeTaste);
  } catch (error) {
    next(error);
  }
});

// Get a specific coffee taste info
router.get('/coffeetaste/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }
    const coffeeTaste = await CoffeeTaste.findById(id);
    if (!coffeeTaste) {
      return res.status(404).json({ message: 'No project found' });
    }
    res.json(coffeeTaste);
  } catch (error) {
    next(error);
  }
});

// Update a coffee by id
router.put('/coffeetaste/:id', async (req, res, next) => {
  const { id } = req.params;
  const {
    coffeeName,
    region,
    roast,
    varieties,
    altitude,
    process,
    body,
    method,
    recipe,
    description,
    storeUrl,
    coffeeImgUrl,
  } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }
    const updatedCoffeeTaste = await CoffeeTaste.findByIdAndUpdate(
      id,
      {
        coffeeName,
        region,
        roast,
        varieties,
        altitude,
        process,
        body,
        method,
        recipe,
        description,
        storeUrl,
        coffeeImgUrl,
      },
      { new: true }
    );

    if (!updatedCoffeeTaste) {
      return res.status(404).json({ message: 'Coffee not found' });
    }

    res.json(updatedCoffeeTaste);
  } catch (error) {
    next(error);
  }
});

// Delete a coffee by id
router.delete('/coffeetaste/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }
    await CoffeeTaste.findByIdAndDelete(id);
    res.json({ message: 'Coffee deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
