import { Model } from 'sequelize-typescript';
import { VoteType } from '../../globals/types/VoteTypes/voteTypes.js';
declare class FeedVote extends Model {
    id: string;
    type: VoteType;
}
export default FeedVote;
//# sourceMappingURL=FeedVote.d.ts.map