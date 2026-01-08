import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import conndb from './config/db.js';
import connCloudinary from './config/cloudinary.js';

import router from './Routes/auth.routes.js';
import userRouter from './Routes/userData.route.js';
import ProductRouter from './Routes/product.route.js';
import CartRouter from './Routes/Cart.routes.js';
import OrderRouter from './Routes/Orders.routes.js';
import Contactrouter from './Routes/contact.routes.js';

dotenv.config();
const app = express();

conndb();
connCloudinary();

const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



const allowedOrigins = [
  'https://trendcasa-fronted.vercel.app', // deployed frontend
  'http://localhost:5178' // local dev
];

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin like mobile apps, Postman, etc.
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'CORS policy: This origin is not allowed';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true // cookies ke liye zaruri
  })
);


app.use('/api/auth', router);
app.use('/api/product', ProductRouter);
app.use('/api/orders', OrderRouter);
app.use('/api', Contactrouter);
app.use('/api/Cart', CartRouter);
app.use('/api/user', userRouter);
// console.log("server")

app.get('/', (req, res) => {
  res.status(200).send('Hi, I am server');
});


app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
