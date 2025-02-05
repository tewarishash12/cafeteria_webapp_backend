const router = require("express").Router();

const { allDishDetails, addDish, deleteDishById, updateDishById } = require("../main_controllers/dishControllers");
const { authLogin, merchantRoleValidation } = require("../middlewares/authMiddleware");

router.get("/alldishes", allDishDetails);

router.post("/", authLogin, merchantRoleValidation, addDish);

router.delete("/id/:id", authLogin, merchantRoleValidation, deleteDishById);

router.put("/id/:id", authLogin, merchantRoleValidation, updateDishById);

module.exports = router;