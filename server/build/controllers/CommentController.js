import APIResponse from "../utils/APIResponses/ApiResponse.js";
import { validate as isUUID, version as uuidVersion } from 'uuid';
import FeedPost from "../database/models/Feed_posts.js";
import Comment from "../database/models/CommentModel.js";
import CommentVote from "../database/models/CommentVote.js";
import { VoteType } from "../globals/types/VoteTypes/voteTypes.js";
class ExtendedComment extends Comment {
}
class CommentController {
    static async createComment(req, res) {
        const { questionId } = req.params;
        const { content } = req.body ?? {};
        const userId = req.user.id;
        if (!userId) {
            APIResponse(res, 403, "Unauthorized access !");
            return;
        }
        if (!content || content.trim().length === 0) {
            APIResponse(res, 400, "Comment content is required !");
            return;
        }
        if (!questionId) {
            APIResponse(res, 400, "Question id is required in params !");
            return;
        }
        if (!isUUID(questionId) || uuidVersion(questionId) !== 4) {
            APIResponse(res, 400, "Invalid question id format. UUID v4 expected.");
            return;
        }
        const question = await FeedPost.findByPk(questionId);
        if (!question) {
            APIResponse(res, 404, "Question not found !");
            return;
        }
        const comment = await Comment.create({
            text: content.trim(),
            userId,
            feedId: question.id
        });
        const extendedComment = comment;
        const payload = {
            id: comment.id,
            text: comment.text,
            questionId: extendedComment.feedId,
            userId: extendedComment.userId
        };
        const io = req.app.get("io");
        if (io) {
            io.emit("comment-created", payload);
        }
        APIResponse(res, 201, "Comment created successfully !", comment);
        return;
    }
    static async getCommentByQuestion(req, res) {
        const { questionId } = req.params;
        const userId = req.user.id;
        if (!questionId) {
            APIResponse(res, 400, "Question id is required in params !");
            return;
        }
        if (!isUUID(questionId) || uuidVersion(questionId) !== 4) {
            APIResponse(res, 400, "Invalid question id format. UUID v4 expected.");
            return;
        }
        const question = await FeedPost.findByPk(questionId);
        if (!question) {
            APIResponse(res, 404, "Question not found !");
            return;
        }
        const comments = await Comment.findAll({
            where: {
                feedId: questionId
            }
        });
        if (!comments || comments.length === 0) {
            APIResponse(res, 404, "No comments found !");
            return;
        }
        APIResponse(res, 200, "Comments fetched successfully for given question id !", comments);
        return;
    }
    static async updateComment(req, res) {
        const { commentId } = req.params;
        const { content } = req.body ?? {};
        const userId = req.user.id;
        if (!userId) {
            APIResponse(res, 403, "Unauthorized access !");
            return;
        }
        if (!content || content.trim().length === 0) {
            APIResponse(res, 400, "Comment content is required !");
            return;
        }
        if (content.length > 250) {
            APIResponse(res, 400, "Comment contents must be less than 250 characters !");
            return;
        }
        if (!commentId) {
            APIResponse(res, 400, "Comment id is required in params !");
            return;
        }
        if (!isUUID(commentId) || uuidVersion(commentId) !== 4) {
            APIResponse(res, 400, "Invalid comment id format. UUID v4 expected.");
            return;
        }
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            APIResponse(res, 404, "Comment Details not found !");
            return;
        }
        const extendedComment = comment;
        if (extendedComment.userId !== userId) {
            APIResponse(res, 403, "You can only edit your comment !");
            return;
        }
        comment.text = content.trim();
        await comment.save();
        const payload = {
            comment,
            questionId: comment.feedId
        };
        const io = req.app.get("io");
        if (io) {
            io.emit("comment-updated", payload);
        }
        APIResponse(res, 200, "Comment updated successfully !", comment);
        return;
    }
    static async deleteComment(req, res) {
        const { commentId } = req.params;
        const userId = req.user.id;
        if (!userId) {
            APIResponse(res, 403, "Unauthorized access !");
            return;
        }
        if (!commentId) {
            APIResponse(res, 400, "Comment id is required in params !");
            return;
        }
        if (!isUUID(commentId) || uuidVersion(commentId) !== 4) {
            APIResponse(res, 400, "Invalid comment id format. UUID v4 expected.");
            return;
        }
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            APIResponse(res, 404, "Comment not found !");
            return;
        }
        const extendedComment = comment;
        if (extendedComment.userId !== userId) {
            APIResponse(res, 403, "You can only delete your comment !");
            return;
        }
        await CommentVote.destroy({
            where: {
                commentId
            }
        });
        // destroy the comment instance itself
        await comment.destroy();
        const payload = {
            commentId,
            questionId: extendedComment.feedId
        };
        const io = req.app.get("io");
        if (io) {
            io.emit("comment-deleted", payload);
        }
        APIResponse(res, 200, "Comment deleted successfully !");
    }
    static async commentVote(req, res) {
        const { commentId } = req.params;
        const { type } = req.body ?? {};
        const userId = req.user.id;
        if (!userId) {
            APIResponse(res, 403, "Unauthorized access !");
            return;
        }
        if (!commentId) {
            APIResponse(res, 400, "Please send commentId");
            return;
        }
        if (!type || (!Object.values(VoteType).includes(type))) {
            APIResponse(res, 400, "Please send type and be valid !");
            return;
        }
        if (!isUUID(commentId) || uuidVersion(commentId) !== 4) {
            APIResponse(res, 400, "Invalid comment id format. UUID v4 expected.");
            return;
        }
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            APIResponse(res, 404, "Comment not found !");
            return;
        }
        const data = await CommentVote.create({
            type,
            commentId,
            userId,
            feedId: comment.feedId
        });
        const io = req.app.get('io');
        if (io) {
            io.emit('comment-likes', data);
        }
        APIResponse(res, 200, 'Voted successfully !', data);
    }
    static async removeCommentVote(req, res) {
        const { commentId } = req.params;
        const userId = req.user.id;
        if (!userId) {
            APIResponse(res, 403, 'Unauthorized access !');
            return;
        }
        if (!commentId) {
            APIResponse(res, 400, 'Please send commentId');
            return;
        }
        if (!isUUID(commentId) || uuidVersion(commentId) !== 4) {
            APIResponse(res, 400, 'Invalid comment id format. UUID v4 expected.');
            return;
        }
        const vote = await CommentVote.findOne({
            where: {
                commentId,
                userId
            }
        });
        if (!vote) {
            APIResponse(res, 404, 'No vote found for this comment by the user');
            return;
        }
        await vote.destroy();
        const io = req.app.get('io');
        if (io) {
            io.emit('comment-unliked', { commentId, userId });
        }
        APIResponse(res, 200, 'Comment vote removed successfully !');
        return;
    }
}
export default CommentController;
//# sourceMappingURL=CommentController.js.map