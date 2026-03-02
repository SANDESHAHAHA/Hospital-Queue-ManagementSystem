import Appointment from "../database/models/Appointment.js";
declare const updateQueuePositionService: (doctorId: string, date: string) => Promise<Appointment | null>;
export default updateQueuePositionService;
export declare const resequenceQueuePositions: (doctorId: string, date: string) => Promise<number>;
//# sourceMappingURL=QueuePositionService.d.ts.map