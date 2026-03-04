import { Model } from 'sequelize-typescript';
import { VoteType } from '../../globals/types/VoteTypes/voteTypes.js';
declare class CommentVote extends Model {
    id: string;
    type: VoteType;
}
export default CommentVote;
//# sourceMappingURL=CommentVote.d.ts.map