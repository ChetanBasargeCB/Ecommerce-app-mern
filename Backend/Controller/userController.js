import User from '../Model/userModel.js'
import bcrypt from 'bcrypt'

export const registerController = async(req,res)=>{
    const{name,email,phone,password}=req.body

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

    return res.status(201).json({message:"Login Successfull"})
    } catch(err){   
        res.status(500).json({message:"Server Error"})
    }
    

}