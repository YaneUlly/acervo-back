const PublicCoffeeTasteModel = require('../models/PublicCoffeeTaste.model');

const publicCoffee = async (req, res, next) => {
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

  try {
    if (share) {
      await PublicCoffeeTasteModel.create({
        createdBy: req.payload ? req.payload._id : null,
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
        share: true,
        storeUrl,
        coffeeImgUrl,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = publicCoffee;
