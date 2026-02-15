import type { Request, Response } from "express";
declare class UserController {
    static registerUser(req: Request, res: Response): Promise<void>;
    static loginUser(req: Request, res: Response): Promise<void>;
    static getAllUsers(req: Request, res: Response): Promise<void>;
    static getAllDoctors(req: Request, res: Response): Promise<void>;
    static getAllSlots(req: Request, res: Response): Promise<void>;
}
export default UserController;
//# sourceMappingURL=UserController.d.ts.map