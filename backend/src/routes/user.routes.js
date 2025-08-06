const { Router } = require("express");
const userController = require("../controller/user.controller");
    
const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;