import express from 'express'
import { loginController, logoutController, ProfileController, registerController } from '../Controller/userController.js'
import AuthProfile from '../Middelware/AuthUser.js'

 export const userRouter = express.Router()

userRouter.post("/register",registerController)
userRouter.post("/login",loginController)

userRouter.get("/profile",AuthProfile,ProfileController)
userRouter.post("/logout",logoutController)