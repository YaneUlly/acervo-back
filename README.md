# Acervo  

## Description
Acervo is an app for coffee enthusiasts. If you're keen on diving into the world of specialty coffee, the Acervo app can guide you in learning how to taste coffees. Here, you can learn the art of tasting specialty coffee, practice by tracking your coffee tastings, save your recipes and coffee experiences, share them with the community, and explore new coffee options. Additionally, if you're unsure where to begin, we offer a coffee quiz to help you choose your first coffee based on your taste and preferences. And if you run out of coffee, don't worry—you can easily find the nearest coffee shop around you.

## Routes
### Coffee Hub Community Routes
| Method | Route                       | Description                   |
| ------ | --------------------------- | ----------------------------- |
| GET    | /api/coffeehub              | Returns all coffees           |
| GET    | /api/coffeehub/:coffeeId    | Returns the specified coffee  |

### User Coffee Taste Track Routes
| Method | Route               | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | /api/coffeestaste   | Returns all coffees history   |
| GET    | /api/coffeetaste/:id| Returns the specified coffee  |
| POST   | /api/coffeetaste    | Creates a new coffee          |
| PUT    | /api/coffeetaste/:id| Edits the specified coffee    |
| DELETE | /api/coffeetaste/:id| Deletes the specified coffee  |

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
id: Number,
coffeeTaste: { type: mongoose.Schema.Types.ObjectId,
ref: 'CoffeeTaste'}
}
```

### Coffee Taste Model
```js
{
  id: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth' },
  coffeeName: { type: String, required: true },
  region: { type: String, required: true },
  roast: String,
  varieties: [String],
  altitude: [Number],
  process: [String],
  aroma: [String],
  flavor: [String],
  body: { type: String, enum: ['aquoso', 'unctuous', 'fatty'] },
  method: String,
  recipe: String,
  description: String,
  storeUrl: String,
  coffeeImgUrl: { type: String, default:''}, 
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
  <li><strong>Front-End</strong>: </li>
  <li><strong>Back-End</strong>: <a href='https://github.com/YaneUlly/acervo-back'>Acervo</a></li>
  <li><strong>Deploy Link</strong>: TBC</li>
</ul>

## Author
<ul>
  <li><strong>Yane Ully</strong>: <a href='https://github.com/YaneUlly'>GitHub</a> - <a href='https://www.linkedin.com/in/yane-ully-martins/'>Linkedin</a></li>
</ul>
