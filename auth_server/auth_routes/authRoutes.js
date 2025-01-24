const router = require("express").Router();

const { register, login } = require("../main_controllers/authControllers");

router.post("/register", register)

router.post("/login", login)

module.exports = router;