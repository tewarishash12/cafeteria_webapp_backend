const router = require("express").Router();

const { allCounters, createCounter, deleteCounterById, updateCounter } = require("../main_controllers/counterControllers");
const { adminRoleValidation, authLogin,adminMerchantValidation } = require("../middlewares/authMiddleware");

router.get('/', allCounters);

router.post('/', authLogin, adminRoleValidation, createCounter);

router.delete("/id/:id", authLogin, adminRoleValidation, deleteCounterById);

router.patch("/id/:id", authLogin, adminMerchantValidation, updateCounter);

module.exports = router;