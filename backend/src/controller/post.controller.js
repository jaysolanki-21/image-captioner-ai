const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service")
const { uploadImage } = require("../service/storage.service");
const uuid = require("uuid");
const {imagekit} = require("../service/storage.service");
async function createPostController(req, res) {
    try {
        const file = req.file;
        const user = req.user._id;
        if (!file) {
            return res.status(400).json({ error: "Image file is required" });
        }
        const base64Image = Buffer.from(file.buffer).toString('base64');
        const uploaded = await uploadImage(base64Image, uuid.v4());
        const caption = await generateCaption(base64Image);

        const post = await postModel.create({
            image: uploaded.url,
            caption,
            user,
            fileId : uploaded.fileId
        });

        res.status(201).json({ post });
    } catch (err) {
        console.error("Create post error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

async function myPosts(req, res) {
    try {
        const user = req.user._id;
        const posts = await postModel.find({ user }).lean(); 

        const formattedPosts = posts.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata"
            })
        }));

        res.status(200).json({ posts: formattedPosts });
    } catch (err) {
        console.error("My posts error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}


async function deletePostController(req, res) {
    try {
        const postId = req.params.id;
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        if (post.fileId) {
            await imagekit.deleteFile(post.fileId); 
        }

        await postModel.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });

    } catch (err) {
        console.error("Delete post error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}



module.exports = {
    createPostController,
    myPosts,
    deletePostController
}