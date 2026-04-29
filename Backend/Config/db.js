import dotenv from 'dotenv/config'
import mongoose from 'mongoose'

 const ConnectDB = async ()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log("Database Connected")
    } catch (error) {
        console.log("data base Connection err",error) 
    }
}


export default ConnectDB