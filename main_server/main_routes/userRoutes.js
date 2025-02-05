const router = require("express").Router();

const { allUserDetails, createUser, deleteUserById, updateUser, me, getMerchants  } = require("../main_controllers/userControllers");

const { adminRoleValidation, authLogin } = require("../middlewares/authMiddleware");

router.get('/', authLogin, adminRoleValidation, allUserDetails);

router.post('/', authLogin, adminRoleValidation, createUser);

router.delete("/id/:id", authLogin, adminRoleValidation, deleteUserById);

router.put("/id/:id", authLogin, updateUser);

router.get("/me", authLogin, me)

module.exports = router;