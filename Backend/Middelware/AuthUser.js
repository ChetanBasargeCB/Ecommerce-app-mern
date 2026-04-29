import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'

const KEY = process.env.JWT_KEY

const AuthProfile = async (req, res, next) => {
    try {
        // Since you are using cookies, ensure 'cookie-parser' is installed and used in server.js
        const token = req.cookies.token
        
        if (!token) {
            return res.status(401).json({ message: "Token not found, please login" })
        }

        const decoded = jwt.verify(token, KEY)
        
        // IMPORTANT: Attach the decoded data (e.g., id, email) to the request object
        // Now the NEXT function (the controller) can access req.user.id
        req.user = decoded 

        console.log("Profile Authentication passed for User:", decoded.id)
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or Expired Token" })
    }
}

export default AuthProfile