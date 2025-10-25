import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
            const token = req.header["authorization"]?.split(" ")[1];
            if(!token){
                return res.status(401).josn({message:"Access denied"});
            }

            try{
                const decoded = jwt.verify(token,"JWT_SEC_KEY");
                req.user = decoded;
                next();
            }
            catch(err){
                res.status(400).json({ message: "Invalid token." });
            }
}