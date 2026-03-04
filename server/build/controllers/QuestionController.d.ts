import type { Request, Response } from "express";
interface IQuestionRequest extends Request {
    file: Express.Multer.File;
    user: {
        id: string;
        email: string;
        role: string;
    };
}
declare class QuestionController {
    static createQuestion(req: IQuestionRequest, res: Response): Promise<void>;
    static getAllQuestions(req: IQuestionRequest, res: Response): Promise<void>;
    static questionVote(req: IQuestionRequest, res: Response): Promise<void>;
}
export default QuestionController;
//# sourceMappingURL=QuestionController.d.ts.map