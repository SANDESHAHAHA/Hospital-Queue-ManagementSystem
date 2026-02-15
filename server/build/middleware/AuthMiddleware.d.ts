import type { Request, Response, NextFunction } from "express";
import type { Role } from "../globals/types/Role.js";
interface AuthRequest extends Request {
    user: {
        id: string;
        role: string;
        userName: string;
        email: string;
        phoneNumber: string;
    };
}
declare class AuthMiddleware {
    static isLoggedIn(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static restrictTo(...roles: Role[]): (req: AuthRequest, res: Response, next: NextFunction) => void;
}
export default AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.d.ts.map