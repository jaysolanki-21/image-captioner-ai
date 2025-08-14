const express = require('express')
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware")
const { createPostController,myPosts,deletePostController} = require("../controller/post.controller")
const upload = require("../service/multer.config")

router.post('/',
    authMiddleware, 
    upload.single('image'),
    createPostController
)

router.get('/my-posts',
    authMiddleware,
    myPosts
)

router.delete('/my-posts/:id',
    authMiddleware,
    deletePostController
)

module.exports = router;