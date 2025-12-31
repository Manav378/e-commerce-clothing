import express from 'express'
import {getUserData} from '../Controllers/user.controller.js'
import authMiddelware from '../Middelware/auth.middelware.js'
const userRouter = express.Router()

userRouter.get("/data",authMiddelware , getUserData)

export default userRouter;