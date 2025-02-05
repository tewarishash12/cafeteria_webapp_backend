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
    try {
        const counter = new Counter(req.body);
        
        await counter.save();
        
        const counters = await Counter.find().populate("merchant_id");

        res.status(201).json({ counters });
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
        const { shop_name,merchant_id,image,hours,description,isActive } = req.body;
        const counterId = await Counter.findById(req.params.id);
        
        if (!counterId)
            return res.status(404).json({ message: "Requested user doesn't exist" });

        await Counter.findByIdAndUpdate({ _id: req.params.id }, { shop_name:shop_name, description:description, merchant_id:merchant_id, image:image, hours:hours, isActive:isActive }, { new: true });

        const counters = await Counter.find().populate("merchant_id");
        const dishes = await Dish.find().populate('counter_id');

        res.status(201).json({counters, dishes});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}