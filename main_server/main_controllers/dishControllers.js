const Dish = require("../main_model/dish");

exports.allDishDetails = async (req, res) => {
    try {
        const dishes = await Dish.find().select('-__v').populate("counter_id", "shop_name");
        if (!dishes)
            return res.status(404).json({ message: "Something unexpected is requested" })
        res.status(201).json({ dishes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.addDish = async (req, res) => {
    try {
        const { dish_name, description, image, availability, counter_id, price } = req.body
        const intPrice = parseInt(price)
        const dish = new Dish({ dish_name, description, image, availability, counter_id, price: intPrice });
        const result = await dish.save();
        const dishes = await Dish.find().populate('counter_id');
        res.status(201).json({ dishes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteDishById = async (req, res) => {
    try {
        const dishId = await Dish.findById(req.params.id);
        if (!dishId)
            return res.status(404).json({ message: "Requested user doesn't exist" });
        await Dish.findByIdAndDelete(req.params.id);

        res.status(201).json({message: "Dish has been deleted successfully"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateDishById = async (req, res) => {
    try {
        console.log(req.body);
        const { dish_name, description, image, price, availability } = req.body;
        const dishId = await Dish.findById(req.params.id);

        if (!dishId)
            return res.status(404).json({ message: "Requested user doesn't exist" });

        const dish = await Dish.findByIdAndUpdate({ _id: req.params.id }, { dish_name: dish_name, description: description, image: image, price: price, availability: availability }, { new: true });

        const dishes = await Dish.find().populate('counter_id');
        res.status(201).json({ dishes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

