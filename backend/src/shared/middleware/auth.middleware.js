import jwt from 'jsonwebtoken';

const protect =(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success:false,
                message:"Unauthorized!!!",
            });
        }

        const token = authHeader.split(' ')[1];

        
        console.log("Auth middleware:(token) "+token);
        console.log("Auth middleware:(access secret) "+process.env.JWT_ACCESS_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        req.user=decoded;

        next();
    } catch (error) {
        console.log(error);
       return res.status(401).json({
        success:false,
        message:"Invalid token",
       }) 
    }
}

export default protect;