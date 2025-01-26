const Dish = require("../main_model/dish");

exports.allDishDetails = async (req, res) => {
    try {
        const dishes = await Dish.find().select('-__v').populate("counter_id", "shop_name");
        if (!dishes)
            return res.status(404).json({ message: "Something unexpected is requested" })
        res.status(201).json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.addDish = async (req, res) => {
    try {
        const dish = new Dish(req.body);
        const result = await dish.save();
        res.status(201).json({ message: "New user created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteDishById = async (req, res) => {
    try {
        const dishId = await Dish.findById(req.params.id);
        if (!dishId)
            return res.status(404).json({ message: "Requested user doesn't exist" });
        const dish = await Dish.findByIdAndDelete(req.params.id);
        res.status(201).json(dish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateDishById = async (req, res) => {
    try {
        const { dish_name, description, image, price, availability, counter_id } = req.body;
        const dishId = await Dish.findById(req.params.id);
        
        if (!dishId)
            return res.status(404).json({ message: "Requested user doesn't exist" });

        const user = await Dish.findByIdAndUpdate({ _id: req.params.id }, { dish_name: dish_name, description: description, image: image, price: price, availability: availability, counter_id: counter_id }, { new: true });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getDishesByCounterId = async (req,res) =>{
    try {
        const id = req.params.id;
        const items = await Dish.find({counter_id: id});
        res.status(201).json(items);
    } catch(err) {
        res.status(500).json({message:err.message})
    }
}