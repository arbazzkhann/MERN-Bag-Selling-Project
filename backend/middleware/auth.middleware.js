import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if(!token) {
        return res.status(400).json({
            success: false,
            message: "Not authorized, login again"
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedToken) {
            return res.status(400).json({
                success: false,
                message: "Not authorized, login again"
            });  
        }
        req.body.userId = decodedToken;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error while authenticate."
        });
    }
}

export default authMiddleware;