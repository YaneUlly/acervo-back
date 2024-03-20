const router = require('express').Router();
const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const UserAuth = require('../models/UserAuth.model');

// adding a coffee in the wishlist
router.post('/coffeehub/add/:id', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { id } = req.params;

  try {
    const existingItem = await Wishlist.findOne({
      coffeeTaste: id,
      user: userId,
    });
    if (existingItem) {
      return res.status(400).json({ error: 'Coffee already in the wishlist' });
    }

    await Wishlist.create({ coffeeTaste: id, user: userId });
    return res.status(201).json({ message: 'Coffee added to the wishlist' });
  } catch (error) {
    console.error('Error trying to add the coffee at the wishlist', error);
    next(error);
  }
});

// get all coffees in the wishlist
router.get('/wishlist', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const userWishlist = await Wishlist.find({ user: userId }).populate(
      'coffeeTaste'
    );
    res.status(200).json(userWishlist);
  } catch (error) {
    next(error);
  }
});

// removing the coffee from the wishlist via coffeehub
router.delete(
  '/coffeehub/remove/:id',
  isAuthenticated,
  async (req, res, next) => {
    const userId = req.payload._id;
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Id is not valid' });
      }
      await Wishlist.findOneAndDelete({ coffeeTaste: id, user: userId });
      res.json({ message: 'Coffee deleted from wishlist' });
    } catch (error) {
      console.log('Error trying to remove coffee from wishlist', error);
      next(error);
    }
  }
);

module.exports = router;
