import User from '../Model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import cookieParser from 'cookie-parser'

export const registerController = async(req,res)=>{
    const{name,email,phone,password}=req.body
    
    console.log(name,email,phone,password)

    try {

         if(!name||!email||!phone||!password)
         return res.status(401).json({message:"All fields required"})

         const exiest = await User.findOne({email})
         if(exiest) return res.status(409).json({message:"User Already exiest"})
        
        const hashpassword = await bcrypt.hash(password,10)
        
          await User.create({
            name,
            email,
            phone,
            password:hashpassword
          })

        res.status(201).json({message:"Account Created!"})
        
    } catch (error) {
        console.log("Registration error",error)
    }
}


export const loginController = async(req,res)=>{
    try {
    const {email,password}=req.body;
    if(!email) return res.status(400).json({message:"Email required"})
    if(!password) return res.status(400).json({message:"Password required"})
    
    const user = await User.findOne({email})
    if(!user)return res.status(401).json({message:"User not found please register"})
    
    const isPassword = await bcrypt.compare(password,user.password)
    if(!isPassword) return res.status(401).json({message:"Invalid Password"})

    const token = jwt.sign({id:user._id},
        process.env.JWT_KEY,
        {expiresIn:"15min"}
    )

    // Cookie assinging
    res.cookie("token",token ,{
        httpOnly:true,
        secure:false,
        sameSite:"strict"
    })

    return res.status(200).json({message:"Login Successfull",token})
    } catch(err){   
        console.log("Login sever error")
        res.status(500).json({message:"Server Error"})
    }
    

}



export const ProfileController = async (req, res) => {
    try {
        // req.user was created in the middleware above
        const userId = req.user.id; 

        // Find the user by ID and exclude the password field for security
        const user = await User.findById(userId).select("-password");
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found in database" });
        }

        // Send the specific user data back to the frontend
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
