import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

 export const ConnnetDB = async ()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log("Database Connected")
    } catch (error) {
        console.log("data base Connection err",error) 
    }
}
console.log(process.env.URI)


