const router = require("express").Router();

const { addToCart, removeFromCart, updateQuantity } = require("../main_controllers/cartControllers");

const { authLogin } = require("../middlewares/authMiddleware");

router.patch("/addtocart", addToCart);

router.patch("/removefromcart", removeFromCart);

router.patch("/updatecart", updateQuantity);

module.exports = router;