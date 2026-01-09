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


app.use(cors({
  origin: [
    'http://localhost:5178',
    'http://localhost:5179',
    'https://trendcasa-fronted.vercel.app' ,
    'https://fronted-admin.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

conndb();
connCloudinary();

// routes
app.use('/api/auth', router);
app.use('/api/product', ProductRouter);
app.use('/api/orders', OrderRouter);
app.use('/api', Contactrouter);
app.use('/api/Cart', CartRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hi, I am server');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
