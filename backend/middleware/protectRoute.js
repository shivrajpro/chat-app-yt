import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized -  no token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"Unauthorized -  invalid token provided"});
        }

        const user = await User.findById(decoded.userId).select("-password"); //remove password

        req.user = user; //authenticated user

        next(); //call the next function, i.e. sendMessage
    } catch (error) {
        console.log('error in protected route middleware', error.message);
    }
}