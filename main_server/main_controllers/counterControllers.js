const Counter = require('../main_model/counter')

exports.allCounters = async (req, res) => {
    try {
        const counters = await Counter.find().select('-__v -_id');
        if (!counters)
            return res.status(404).json({ message: "Something unexpected is requested" })
        res.status(201).json(counters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

exports.createCounter = async (req, res) => {
    try {
        const counter = new Counter(req.body);
        const result = await counter.save();
        res.status(201).json({ message: "New user created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.counterDetailById = async (req, res) => {
    try {
        const counter = await Counter.findById(req.params.id).select('-__v -_id');
        if (!counter)
            return res.status(404).json({ message: "Requested user doesn't exist" });
        res.status(201).json(counter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.deleteCounterById = async (req, res) => {
    try {
        const counterId = await Counter.findById(req.params.id);
        if (!counterId)
            return res.status(404).json({ message: "Requested user doesn't exist" });
        const counter = await Counter.findByIdAndDelete(req.params.id);
        res.status(201).json(counter);
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

        const counter = await Counter.findByIdAndUpdate({ _id: req.params.id }, { shop_name:shop_name }, { new: true });
        res.status(201).json(counter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}