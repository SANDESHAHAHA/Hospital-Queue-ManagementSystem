import APIResponse from "../utils/APIResponses/ApiResponse.js";
import fs from 'fs';
import path from 'path';
import uploadOnCloudinary from "../services/cloudinaryConfig.js";
import FeedPost from "../database/models/Feed_posts.js";
class QuestionController {
    static async createQuestion(req, res) {
        const { title, description, category, tags } = req.body ?? {};
        if (!title || !description || !category || !tags) {
            APIResponse(res, 404, "Title,description and category are required !");
            return;
        }
        let fileName;
        if (req.file) {
            const filePath = path.join('./uploads', req.file.filename);
            const cloudiaryResponse = await uploadOnCloudinary(filePath);
            if (cloudiaryResponse && cloudiaryResponse.secure_url) {
                fileName = cloudiaryResponse.secure_url;
            }
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        const data = await FeedPost.create({
            title,
            description,
            category,
            tags,
            imageUrl: fileName ? fileName : null,
            userId: req.user.id
        });
        // emit the new question to all connected websocket clients (if io is available)
        try {
            const io = req.app.get('io');
            if (io) {
                io.emit('new-question', data);
            }
        }
        catch (e) {
            console.error('Error emitting new-question', e);
        }
        APIResponse(res, 200, "Feed created successfully !", data);
    }
}
export default QuestionController;
//# sourceMappingURL=QuestionController.js.map