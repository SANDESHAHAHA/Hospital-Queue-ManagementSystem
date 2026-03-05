import type { Request, Response } from "express";
interface ICommentRequest extends Request {
    user: {
        id: string;
    };
}
declare class CommentController {
    static createComment(req: ICommentRequest, res: Response): Promise<void>;
    static getCommentByQuestion(req: ICommentRequest, res: Response): Promise<void>;
    static updateComment(req: ICommentRequest, res: Response): Promise<void>;
    static deleteComment(req: ICommentRequest, res: Response): Promise<void>;
    static commentVote(req: ICommentRequest, res: Response): Promise<void>;
    static removeCommentVote(req: ICommentRequest, res: Response): Promise<void>;
}
export default CommentController;
//# sourceMappingURL=CommentController.d.ts.map