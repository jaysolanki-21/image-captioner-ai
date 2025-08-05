const { Router } = require("express");
const userController = require("../controller/user.controller");
    
const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;