# Acervo

## Description

Acervo is an app for coffee enthusiasts. If you're keen on diving into the world of specialty coffee, the Acervo app can guide you in learning how to taste coffees. Here, you can learn the art of tasting specialty coffee, practice by tracking your coffee tastings, save your recipes and coffee experiences, share them with the community, learn about the coffee species, and explore new coffee options. Additionally, if you're unsure where to begin, we offer a coffee quiz to help you choose your first coffee based on your taste and preferences.

## Routes

### Coffee Hub Community Routes

| Method | Route              | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | /api/coffeehub     | Returns all coffees          |
| GET    | /api/coffeehub/:id | Returns the specified coffee |

### User Coffee Taste Track Routes

| Method | Route                | Description                  |
| ------ | -------------------- | ---------------------------- |
| GET    | /api/coffeestaste    | Returns all coffees history  |
| GET    | /api/coffeetaste/:id | Returns the specified coffee |
| POST   | /api/coffeetaste     | Creates a new coffee         |
| PUT    | /api/coffeetaste/:id | Edits the specified coffee   |
| DELETE | /api/coffeetaste/:id | Deletes the specified coffee |

### Comments Routes

| Method | Route                       | Description                 |
| ------ | --------------------------- | --------------------------- |
| GET    | /api/coffeehub/:id/comments | Returns all coffee comments |
| POST   | /api/coffeehub/:id/comments | Creates a new comment       |
| PUT    | /api/coffeehub/comments/:id | Edits the user comment      |
| DELETE | /api/coffeehub/comments/:id | Deletes the user comment    |

### Wishlist Routes

| Method | Route                     | Description                          |
| ------ | ------------------------- | ------------------------------------ |
| GET    | /api/wishlist             | Returns all coffee from the wishlist |
| POST   | /api/coffeehub/add/:id    | Add the coffee in the wishlist       |
| DELETE | /api/coffeehub/remove/:id | Remove the coffee from the wishlist  |

## Quiz Routes

| Method | Route           | Description             |
| ------ | --------------- | ----------------------- |
| POST   | /api/coffeequiz | Send the coffee answers |

### User Auth Routes

| Method | Route        | Description        |
| ------ | ------------ | ------------------ |
| POST   | /auth/signup | Creates a new user |
| POST   | /auth/login  | Logs the user      |
| GET    | /auth/verify | Verifies the JWT   |

## Models

### Coffee Hub Model

```js
{
_id: Number,
coffeeTaste: { type: mongoose.Schema.Types.ObjectId,
ref: 'CoffeeTaste'}
}
```

### Coffee Taste Model

```js
{
  _id: Number,
  createdBy: [{ type: Schema.Types.ObjectId, ref: 'UserAuth' }],
  coffeeName: { type: String, required: true },
  region: {
    type: String,
    enum: ['central america', 'south america', 'asia', 'africa', 'arabia'],
    required: true,
  },
  country: String,
  roast: {
    type: String,
    enum: ['light roast', 'medium roast', 'dark roast'],
    required: true,
  },
  caffeine: { type: String, enum: ['regular', 'decaf'], required: true },
  method: {
    type: String,
    enum: [
      'espresso-machine',
      'moka-pot',
      'french-press',
      'aeropress',
      'V60',
      'chemex',
      'cold-brew',
      'other',
    ],
    required: true,
  },
  varieties: [String],
  altitude: [String],
  process: [String],
  aromas: [String],
  flavor: {
    type: String,
    enum: [
      'sweet',
      'floral',
      'fruity',
      'sour-fermented',
      'green-vegetative',
      'roasted',
      'spices',
      'nutty-cocoa',
    ],
    required: true,
  },
  body: { type: String, enum: ['aquoso', 'unctuous', 'fatty'] },
  recipe: String,
  description: String,
  share: { type: Boolean, default: false },
  storeUrl: String,
  coffeeImgUrl: {
    type: String,
    default:
      'https://i.pinimg.com/originals/15/79/15/157915e18cbeb48505a1cdb78bf8a0e8.jpg',
  },
}
```

### Comments Model

```js
{
  _id: Number,
  coffeeTaste: { type: Schema.Types.ObjectId, ref: 'CoffeeTaste' },
  user: { type: Schema.Types.ObjectId, ref: 'UserAuth' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  }
```

### Wishlist Model

```js
{
  _id: Number,
  coffeeTaste: { type: Schema.Types.ObjectId, ref: 'CoffeeTaste' },
  user: { type: Schema.Types.ObjectId, ref: 'UserAuth' },
}
```

### Public Coffee Taste Model

```js
{
 _id: Number,
 coffeeName: { type: String, required: true },
  region: {
    type: String,
    enum: ['central america', 'south america', 'asia', 'africa', 'arabia'],
    required: true,
  },
  country: String,
  roast: {
    type: String,
    enum: ['light roast', 'medium roast', 'dark roast'],
    required: true,
  },
  caffeine: { type: String, enum: ['regular', 'decaf'], required: true },
  method: {
    type: String,
    enum: [
      'espresso-machine',
      'moka-pot',
      'french-press',
      'aeropress',
      'V60',
      'chemex',
      'cold-brew',
      'other',
    ],
    required: true,
  },
  varieties: [String],
  altitude: [String],
  process: [String],
  aromas: [String],
  flavor: {
    type: String,
    enum: [
      'sweet',
      'floral',
      'fruity',
      'sour-fermented',
      'green-vegetative',
      'roasted',
      'spices',
      'nutty-cocoa',
    ],
    required: true,
  },
  body: { type: String, enum: ['aquoso', 'unctuous', 'fatty'] },
  recipe: String,
  description: String,
  share: { type: Boolean, default: false },
  storeUrl: String,
  coffeeImgUrl: {
    type: String,
    default:
      'https://i.pinimg.com/originals/15/79/15/157915e18cbeb48505a1cdb78bf8a0e8.jpg',
  },
}
```

### User Auth Model

```js
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  photoUrl: { type: String, default: ''},
}
```

## Packages

<ul>
  <li>Nodemon</li>
  <li>Morgan</li>
  <li>Mongoose</li>
  <li>Express</li>
  <li>CORS</li>
</ul>

## Links

### Git

<ul>
  <li><strong>Front-End</strong>: <a href='https://github.com/YaneUlly/acervo-front'>Acervo</a></li>
  <li><strong>Back-End</strong>: <a href='https://github.com/YaneUlly/acervo-back'>Acervo</a></li>
  <li><strong>Deploy Link</strong>: <a>Live Acervo</a></li>
</ul>

## Author

<ul>
  <li><strong>Yane Ully</strong>: <a href='https://github.com/YaneUlly'>GitHub</a> - <a href='https://www.linkedin.com/in/yane-ully-martins/'>Linkedin</a></li>
</ul>
