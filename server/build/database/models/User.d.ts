import { Model } from 'sequelize-typescript';
declare class User extends Model {
    id: string;
    userName: string;
    email: string;
    password: string;
    role: 'customer' | 'admin';
    phoneNumber: string;
}
export default User;
//# sourceMappingURL=User.d.ts.map