const router = require("express").Router();

const { allDishDetails, addDish, deleteDishById, updateDishById } = require("../main_controllers/dishControllers");

router.get("/alldishes", allDishDetails);

router.post("/", addDish);

router.delete("/id/:id", deleteDishById);

router.put("/id/:id", updateDishById);

module.exports = router;