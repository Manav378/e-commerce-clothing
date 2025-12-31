import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import conndb from './config/db.js'
import router from './Routes/auth.routes.js'
dotenv.config();
const app = express()
conndb();
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))
app.use("/api/auth" , router);
app.get("/auth" , (req,res)=>{
    res.status(200).send("Hi i am server")
})


app.listen(PORT ,()=>console.log(`The server is running at port: ${PORT}`))





