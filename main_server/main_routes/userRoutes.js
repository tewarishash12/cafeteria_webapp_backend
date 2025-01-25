const router = require("express").Router();

const { allUserDetails, userDetailById, createUser, deleteUserById, updateUser, me  } = require("../main_controllers/userControllers");
const { authLogin } = require("../middlewares/authMiddleware");

router.get('/', allUserDetails);

router.post('/', createUser);

router.get('/id/:id', userDetailById);

router.delete("/id/:id", deleteUserById);

router.put("/id/:id", updateUser);

router.get("/me", authLogin, me)

module.exports = router;