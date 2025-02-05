const router = require("express").Router();

const { allCounters, counterDetailById, createCounter, deleteCounterById, updateCounter } = require("../main_controllers/counterControllers");

router.get('/', allCounters);

router.post('/', createCounter);

router.delete("/id/:id", deleteCounterById);

router.put("/id/:id", updateCounter);

module.exports = router;