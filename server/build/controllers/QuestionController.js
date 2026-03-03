import APIResponse from "../utils/APIResponses/ApiResponse.js";
class QuestionController {
    static async createQuestion(req, res) {
        const { title, description, category, tags } = req.body ?? {};
        if (!title || !description || !category || !tags) {
            APIResponse(res, 404, "Title,description and category are required !");
        }
        return;
    }
}
export default QuestionController;
//# sourceMappingURL=QuestionController.js.map