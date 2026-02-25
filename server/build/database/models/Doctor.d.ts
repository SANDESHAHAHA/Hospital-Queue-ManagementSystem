import { Model } from 'sequelize-typescript';
declare class Doctor extends Model {
    id: string;
    specialization: string;
    licenseNumber: string;
    isApproved: boolean;
    avgConsultationTime: number;
}
export default Doctor;
//# sourceMappingURL=Doctor.d.ts.map