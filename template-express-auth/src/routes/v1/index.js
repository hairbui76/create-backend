const express = require("#configs/express");
const router = express.Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");

router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
