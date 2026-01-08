import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import conndb from './config/db.js'
import router from './Routes/auth.routes.js'
import userRouter from './Routes/userData.route.js'
import connCloudinary from './config/cloudinary.js'
import ProductRouter from './Routes/product.route.js'
import CartRouter from './Routes/Cart.routes.js'
import OrderRouter from './Routes/Orders.routes.js'
import Contactrouter from './Routes/contact.routes.js'
dotenv.config();
const app = express()
conndb();
connCloudinary()
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'https://e-commerce-clothing-zeta.vercel.app',
  'https://trendcasa-admin.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: function(origin, callback) {
    // allow server-to-server requests or Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      return callback(new Error('CORS not allowed'), false);
    }
  },
  credentials: true,
}));

// IMPORTANT: handle preflight requests globally
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));



app.use("/api/auth" , router);
app.use("/api/product" , ProductRouter);
app.use("/api/orders" , OrderRouter)
app.use("/api", Contactrouter);
app.use("/api/Cart" , CartRouter)
app.use("/api/user" , userRouter)
app.get("/" , (req,res)=>{
    res.status(200).send("Hi i am server")
})


app.listen(PORT ,()=>console.log(`The server is running at port: ${PORT}`))





