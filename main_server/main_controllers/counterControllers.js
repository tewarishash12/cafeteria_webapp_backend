const Counter = require('../main_model/counter')
const Dish = require('../main_model/dish')

exports.allCounters = async (req, res) => {
    try {
        const counters = await Counter.find().select('-__v').populate("merchant_id", "username phoneNo");
        if (!counters)
            return res.status(404).json({ message: "Something unexpected is requested" })
        res.status(201).json({counters});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createCounter = async (req, res) => {
    console.log(req.body)
    try {
        const { shop_name, merchant_id } = req.body;

        if (!shop_name || !merchant_id || !Array.isArray(merchant_id) || merchant_id.length === 0) {
            return res.status(400).json({ message: "Shop name and at least one merchant_id are required." });
        }

        const counter = new Counter({
            shop_name,
            merchant_id,
        });

        await counter.save();

        const counters = await Counter.find().populate("merchant_id");

        res.status(201).json({ counters });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.counterDetailById = async (req, res) => {
    try {
        const counter = await Counter.findById(req.params.id).select('-__v').populate("merchant_id", "username phoneNo");
        if (!counter)
            return res.status(404).json({ message: "Requested user doesn't exist" });
        res.status(201).json({counter});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteCounterById = async (req, res) => {
    try {
        const counterId = await Counter.findById(req.params.id);
        if (!counterId)
            return res.status(404).json({ message: "Requested user doesn't exist" });
        await Counter.findByIdAndDelete(req.params.id);
        const counter = await Counter.find().populate("merchant_id");

        await Dish.deleteMany({counter_id:counterId});
        const dishes = await Dish.find();

        res.status(201).json({counter, dishes});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateCounter = async (req, res) => {
    try {
        const { shop_name } = req.body;
        const counterId = await Counter.findById(req.params.id);
        
        if (!counterId)
            return res.status(404).json({ message: "Requested user doesn't exist" });

        await Counter.findByIdAndUpdate({ _id: req.params.id }, { shop_name:shop_name }, { new: true });

        const counter = await Counter.find().populate("merchant_id");
        const dishes = await Dish.find().populate('counter_id');

        res.status(201).json({counter, dishes});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}