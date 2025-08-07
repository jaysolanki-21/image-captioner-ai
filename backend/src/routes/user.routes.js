const { Router } = require("express");
const userController = require("../controller/user.controller");

const authMiddleware = require("../middlewares/auth-middleware");

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/profile", authMiddleware ,userController.profile);

module.exports = router;