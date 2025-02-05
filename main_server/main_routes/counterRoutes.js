const router = require("express").Router();

const { allCounters, createCounter, deleteCounterById, updateCounter } = require("../main_controllers/counterControllers");
const { adminRoleValidation, authLogin } = require("../middlewares/authMiddleware");

router.get('/', allCounters);

router.post('/', authLogin, adminRoleValidation, createCounter);

router.delete("/id/:id", authLogin, adminRoleValidation, deleteCounterById);

router.put("/id/:id", authLogin, adminRoleValidation, updateCounter);

module.exports = router;