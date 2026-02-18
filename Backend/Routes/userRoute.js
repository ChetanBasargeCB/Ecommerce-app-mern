import express from 'express'
import { loginController, registerController } from '../Controller/userController.js'

 export const userRouter = express.Router()

userRouter.post("/register",registerController)
userRouter.post("/login",loginController)