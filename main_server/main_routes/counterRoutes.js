const router = require("express").Router();

const { allCounters, counterDetailById, createCounter, deleteCounterById, updateCounter, getDishesByCounterId } = require("../main_controllers/counterControllers");

router.get('/', allCounters);

router.get('/id/:id', counterDetailById);

router.post('/', createCounter);

router.delete("/id/:id", deleteCounterById);

router.put("/id/:id", updateCounter);

router.get("/id/:id", getDishesByCounterId);

module.exports = router;