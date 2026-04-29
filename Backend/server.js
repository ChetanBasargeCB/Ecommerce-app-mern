import express from 'express'
import dotenv from 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { userRouter } from './Routes/userRoute.js'
import { productRouter } from './Routes/product.js'
import ConnectDB from './Config/db.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser()) 
app.use("/user",userRouter)         
app.use("/user",productRouter)

//
ConnectDB()

app.get("/",(req,res)=>{
    res.send("Hello")   
}) 

app.listen(PORT,()=>console.log("server run",PORT))