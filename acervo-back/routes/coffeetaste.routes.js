const router = require('express').Router();
const CoffeeTaste = require('../models/CoffeeTaste.model');
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const UserAuth = require('../models/UserAuth.model');

// Create a new coffee taste
router.post('/coffeetaste', isAuthenticated, async (req, res, next) => {
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
    public,
    storeUrl,
    coffeeImgUrl,
  } = req.body;

  const userId = req.payload._id;

  try {
    // get the user info by his ID
    const user = await UserAuth.findById(userId).select('name photoUrl');

    // create the new coffee taste with the user info
    const newCoffeeTaste = await CoffeeTaste.create({
      createdBy: userId,
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
      public,
      storeUrl,
      coffeeImgUrl,
    });
    console.log('New Coffee Taste', newCoffeeTaste);
    res.status(201).json({
      _id: newCoffeeTaste._id,
      createdBy: {
        _id: user._id,
        name: user.name,
        photoUrl: user.photoUrl,
      },
      coffeeName: newCoffeeTaste.name,
      region: newCoffeeTaste.region,
      roast: newCoffeeTaste.roast,
      varieties: newCoffeeTaste.varieties,
      altitude: newCoffeeTaste.altitude,
      process: newCoffeeTaste.process,
      body: newCoffeeTaste.body,
      method: newCoffeeTaste.method,
      recipe: newCoffeeTaste.recipe,
      description: newCoffeeTaste.description,
      public: newCoffeeTaste.public,
      storeUrl: newCoffeeTaste.storeUrl,
      coffeeImgUrl: newCoffeeTaste.coffeeImgUrl,
    });
  } catch (error) {
    console.log('An error occured creating the coffee track', error);
    next(error);
  }
});

// Get all coffee track
router.get('/coffeetaste', async (req, res, next) => {
  try {
    const allCoffeeTaste = await CoffeeTaste.find({}).populate(
      'createdBy',
      'name photoUrl'
    );
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
    const coffeeTaste = await CoffeeTaste.findById(id).populate(
      'createdBy',
      'name photoUrl'
    );
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
    public,
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
        public,
        storeUrl,
        coffeeImgUrl,
      },
      { new: true }
    ).populate('createdBy', 'name photoUrl');

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
