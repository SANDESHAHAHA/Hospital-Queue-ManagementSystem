import APIResponse from "../utils/APIResponses/ApiResponse.js";
import fs from 'fs';
import path from 'path';
import uploadOnCloudinary from "../services/cloudinaryConfig.js";
import FeedPost from "../database/models/Feed_posts.js";
import { VoteType } from "../globals/types/VoteTypes/voteTypes.js";
import User from "../database/models/User.js";
import FeedVote from "../database/models/FeedVote.js";
class QuestionController {
    static async createQuestion(req, res) {
        const { title, description, category, tags } = req.body ?? {};
        if (!title || !description || !category || !tags) {
            APIResponse(res, 404, "Title,description,tags and category are required !");
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
        const payload = data && typeof data.toJSON === 'function' ? data.toJSON() : data;
        try {
            const io = req.app.get('io');
            if (io) {
                io.emit('new-question', payload);
            }
        }
        catch (e) {
            console.error('Error emitting new-question', e);
        }
        APIResponse(res, 200, "Question created successfully !", payload);
    }
    static async getAllQuestions(req, res) {
        const data = await FeedPost.findAll();
        if (!data.length) {
            APIResponse(res, 404, "No feeds available !");
            return;
        }
        APIResponse(res, 200, "Questions fetched successfully !", data);
    }
    static async questionVote(req, res) {
        const { id } = req.params;
        const { type } = req.body ?? {};
        const userId = req.user.id;
        if (!id) {
            APIResponse(res, 400, "Please send id of the post !");
            return;
        }
        if (!userId) {
            APIResponse(res, 403, "Unauthorized access !");
            return;
        }
        if (!Object.values(VoteType).includes(type)) {
            APIResponse(res, 400, "Please send valid like type !");
        }
        const question = await FeedPost.findByPk(id);
        if (!question) {
            APIResponse(res, 404, "No feed post of that id found !");
            return;
        }
        const user = await User.findByPk(userId);
        if (!user) {
            APIResponse(res, 404, "No user of that id found !");
            return;
        }
        const data = FeedVote.create({
            type,
            userId,
            feedId: id
        });
        console.log("votedata", data);
        const io = req.app.get('io');
        if (io) {
            io.emit("feed-likes", data);
        }
        APIResponse(res, 200, "Voted successfully !", data);
        return;
    }
}
export default QuestionController;
//# sourceMappingURL=QuestionController.js.map