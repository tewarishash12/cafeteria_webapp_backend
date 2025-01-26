const router = require("express").Router();

const { addToCart, removeFromCart, updateQuantity } = require("../main_controllers/cartControllers");

const { authLogin } = require("../middlewares/authMiddleware");

router.patch("/addtocart", authLogin, addToCart);

router.patch("/removefromcart", authLogin, removeFromCart);

router.patch("/updatecart", authLogin, updateQuantity);

module.exports = router;