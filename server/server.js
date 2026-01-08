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

app.use(
  cors({
    origin: ['http://localhost:5178', 'http://localhost:5179'],
    credentials: true,
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
