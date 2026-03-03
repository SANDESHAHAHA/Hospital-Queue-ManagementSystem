import { Model } from 'sequelize-typescript';
import { VoteType } from '../../globals/types/VoteTypes/voteTypes.js';
declare class Vote extends Model {
    id: string;
    type: VoteType;
}
export default Vote;
//# sourceMappingURL=VoteModel.d.ts.map