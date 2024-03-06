const router = require('express').Router();
const CoffeeTaste = require('../models/CoffeeTaste.model');
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const UserAuth = require('../models/UserAuth.model');
const fileUploader = require('../config/cloudinary.config');

// Create a new coffee taste
router.post('/coffeetaste', isAuthenticated, async (req, res, next) => {
  const {
    coffeeName,
    region,
    country,
    roast,
    caffeine,
    method,
    varieties,
    altitude,
    process,
    aromas,
    flavor,
    body,
    recipe,
    description,
    share,
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
      country,
      roast,
      caffeine,
      method,
      varieties,
      altitude,
      process,
      aromas,
      flavor,
      body,
      recipe,
      description,
      share,
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
      country: newCoffeeTaste.country,
      roast: newCoffeeTaste.roast,
      caffeine: newCoffeeTaste.caffeine,
      method: newCoffeeTaste.method,
      varieties: newCoffeeTaste.varieties,
      altitude: newCoffeeTaste.altitude,
      process: newCoffeeTaste.process,
      aromas: newCoffeeTaste.aromas,
      flavor: newCoffeeTaste.flavor,
      body: newCoffeeTaste.body,
      recipe: newCoffeeTaste.recipe,
      description: newCoffeeTaste.description,
      share: newCoffeeTaste.share,
      storeUrl: newCoffeeTaste.storeUrl,
      coffeeImgUrl: newCoffeeTaste.coffeeImgUrl,
    });
  } catch (error) {
    console.log('An error occured creating the coffee track', error);
    next(error);
  }
});

// Get all coffee track
router.get('/coffeetaste', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const userCoffeeTaste = await CoffeeTaste.find({
      createdBy: userId,
    }).populate('createdBy', 'name photoUrl');
    res.status(200).json(userCoffeeTaste);
  } catch (error) {
    next(error);
  }
});

// Get a specific coffee taste info
router.get('/coffeetaste/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.payload._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    // Find the coffee by coffee ID and user ID
    const coffeeTaste = await CoffeeTaste.findOne({
      _id: id,
      createdBy: userId,
    }).populate('createdBy', 'name photoUrl');
    if (!coffeeTaste) {
      return res.status(404).json({ message: 'No coffee found' });
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
    country,
    roast,
    caffeine,
    method,
    varieties,
    altitude,
    process,
    aromas,
    flavor,
    body,
    recipe,
    description,
    share,
    storeUrl,
    coffeeImgUrl,
  } = req.body;

  console.log(req.body);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }
    const userId = req.payload._id;
    const updatedCoffeeTaste = await CoffeeTaste.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate('createdBy', 'name photoUrl');
    console.log(updatedCoffeeTaste);

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
    const userId = req.payload._id;
    await CoffeeTaste.findOneAndDelete({ _id: id, createdBy: userId });
    res.json({ message: 'Coffee deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// User upload Coffee Image
router.post('/upload', fileUploader.single('file'), async (req, res, next) => {
  try {
    console.log('file is:', req.file);
    res.status(200).json({ coffeeImgUrl: req.file.path });
  } catch (error) {
    console.log('An error occurred uploading the image', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;
