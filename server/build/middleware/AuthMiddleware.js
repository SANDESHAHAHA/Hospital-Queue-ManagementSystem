import jwt from 'jsonwebtoken';
import User from "../database/models/User.js";
class AuthMiddleware {
    static async isLoggedIn(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({
                message: "Please log in to perform actions !"
            });
            return;
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, result) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid token for your credentials !"
                });
                return;
            }
            const userData = await User.findByPk(result.userId);
            if (!userData) {
                res.status(404).json({
                    message: "No user found with that id !"
                });
                return;
            }
            req.user = userData;
            next();
        });
    }
    static restrictTo(...roles) {
        return (req, res, next) => {
            let userRole = req.user.role;
            if (!roles.includes(userRole)) {
                res.status(403).json({
                    message: "You don't have permission !"
                });
                return;
            }
            next();
        };
    }
}
export default AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map