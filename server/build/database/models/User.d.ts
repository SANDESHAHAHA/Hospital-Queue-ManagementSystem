import { Model } from 'sequelize-typescript';
declare class User extends Model {
    id: string;
    userName: string;
    email: string;
    password: string;
    role: 'patient' | 'admin' | 'doctor';
    phoneNumber: string;
    image: string;
    OTP: string;
    OTPgeneratedTime: string;
}
export default User;
//# sourceMappingURL=User.d.ts.map