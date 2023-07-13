const express = require("#configs/express");
const router = express.Router();
const authRoute = require("./auth.route");

router.use("/auth", authRoute);

module.exports = router;
