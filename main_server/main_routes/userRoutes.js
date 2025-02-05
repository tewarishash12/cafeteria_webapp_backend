const router = require("express").Router();

const { allUserDetails, createUser, deleteUserById, updateUser, me, getMerchants  } = require("../main_controllers/userControllers");

const { adminRoleValidation } = require("../middlewares/authMiddleware");

router.get('/',adminRoleValidation, allUserDetails);

router.post('/', adminRoleValidation, createUser);

router.delete("/id/:id", deleteUserById);

router.put("/id/:id", updateUser);

router.get("/me", me)

module.exports = router;