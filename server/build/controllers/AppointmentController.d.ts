import type { Request, Response } from "express";
interface IAppointMentRequest extends Request {
    user: {
        id: string;
    };
}
declare class AppointmentController {
    static bookAppointMent(req: IAppointMentRequest, res: Response): Promise<void>;
}
export default AppointmentController;
//# sourceMappingURL=AppointmentController.d.ts.map