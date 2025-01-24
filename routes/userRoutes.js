const router = require("express").Router();

const { allUserDetails, userDetailById, createUser, deleteUserById, updateUser } = require("../controllers/userControllers");

router.get('/', allUserDetails);

router.post('/', createUser);

router.get('/id/:id', userDetailById);

router.delete("/id/:id", deleteUserById);

router.put("/id/:id", updateUser);

module.exports = router;