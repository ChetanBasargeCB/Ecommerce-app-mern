import express from 'express'
import dotenv from 'dotenv/config'
import { ConnnetDB } from './Config/db.js'
import { userRouter } from './Routes/userRoute.js'
import cors from 'cors'
import { productRouter } from './Routes/product.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use("/user",userRouter) 
app.use("/user",productRouter)

//Database   
ConnnetDB() 
app.get("/",(req,res)=>{
    res.send("Hello")   
})

app.listen(PORT,()=>console.log("server run",PORT))