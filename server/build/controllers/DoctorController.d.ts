import type { Request, Response } from "express";
interface IdoctorRequest extends Request {
    user: {
        id: string;
        userName: string;
        email: string;
        phoneNumber: string;
    };
}
declare class DoctorController {
    static applyForDoctor(req: IdoctorRequest, res: Response): Promise<void>;
    static setConsultationTime(req: IdoctorRequest, res: Response): Promise<void>;
    static setDoctorAvailability(req: IdoctorRequest, res: Response): Promise<void>;
}
export default DoctorController;
//# sourceMappingURL=DoctorController.d.ts.map