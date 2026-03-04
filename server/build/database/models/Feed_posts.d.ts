import { Model } from 'sequelize-typescript';
declare class FeedPost extends Model {
    id: string;
    title: string;
    description: string;
    category: string;
    isAnswered: boolean;
    imageUrl: string;
}
export default FeedPost;
//# sourceMappingURL=Feed_posts.d.ts.map