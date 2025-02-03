const User = require("../main_model/user");
const Dish = require("../main_model/dish")

exports.addToCart = async (req, res) => {
    try {
        const user_id = req.user._id;
        const user = await User.findById({ _id: user_id })
        if (!user)
            return res.status(400).json({ message: "User doesn't exist in database" });

        const { dish_id } = req.body;
        const dish = await Dish.findById({ _id: dish_id });
        if (!dish)
            return res.status(401).json({ message: "This dish doesn't exist in database" });

        const existingCartItem = user.cart.find(cartItem => cartItem.item.toString() === dish_id);

        if(!existingCartItem)
            user.cart.push({ item: dish_id, quantity: 1 })

        const result = await user.save();

        res.status(201).json({ message: "Added the item to cart" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.removeFromCart = async (req, res) => {
    try {
        const user_id = req.user._id;
        const user = await User.findById({ _id: user_id })
        if (!user)
            return res.status(400).json({ message: "User doesn't exist in database" });

        const { dish_id } = req.body;
        const dish = await Dish.findById({ _id: dish_id });
        if (!dish)
            return res.status(401).json({ message: "This dish doesn't exist in database" });

        const result = await User.findByIdAndUpdate(
            user_id,
            {
                $pull: {
                    cart: { "item": dish_id }
                }
            },
            { new: true }
        );

        res.status(201).json({ message: "Item is removed from cart" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateQuantity = async (req, res) => {
    try {
        const user_id = req.user._id;
        const user = await User.findById({ _id: user_id })
        if (!user)
            return res.status(400).json({ message: "User doesn't exist in database" });
        
        const { dish_id, count } = req.body;
        const dish = await Dish.findById({ _id: dish_id });
        if (!dish)
            return res.status(401).json({ message: "This dish doesn't exist in database" });
        const dishInCart = user.cart.find(item => item.item.toString() === dish_id);

        if (dishInCart) {
            dishInCart.quantity += count;

            if (dishInCart.quantity <= 0) {
                user.cart = user.cart.filter(item => item.item.toString() !== dish_id);
            }
        } else if (count > 0) {
            user.cart.push({ dish_id, quantity: count });
        } else {
            return res.status(400).json({ message: "Invalid quantity update" });
        }

        await user.save();

        res.status(201).json({ message: "Updated the cart quantity" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

