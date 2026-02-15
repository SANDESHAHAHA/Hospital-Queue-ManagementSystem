import type { Request, Response } from "express";
declare class AdminController {
    static viewApprovedDoctors(req: Request, res: Response): Promise<void>;
    static getAppliedDoctors(req: Request, res: Response): Promise<void>;
    static approveDoctor(req: Request, res: Response): Promise<void>;
}
export default AdminController;
//# sourceMappingURL=AdminController.d.ts.map