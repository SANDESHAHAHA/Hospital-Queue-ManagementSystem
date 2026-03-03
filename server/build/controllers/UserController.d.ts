import type { Request, Response } from "express";
interface IRequestUser extends Request {
    user?: {
        id: string;
        email: string;
    };
}
declare class UserController {
    static registerUser(req: Request, res: Response): Promise<void>;
    static loginUser(req: Request, res: Response): Promise<void>;
    static getAllUsers(req: Request, res: Response): Promise<void>;
    static verifyOTP(req: IRequestUser, res: Response): Promise<void>;
    static resetPassword(req: Request, res: Response): Promise<void>;
    static getAllDoctors(req: Request, res: Response): Promise<void>;
    static getAllSlots(req: Request, res: Response): Promise<void>;
}
export default UserController;
//# sourceMappingURL=UserController.d.ts.map