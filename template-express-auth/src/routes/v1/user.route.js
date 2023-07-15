const express = require("#configs/express");
const { verifyTokenHandler } = require("#middlewares/verifyTokenHandler");
const userCtl = require("#controllers/user.controller");

const router = express.Router();

router.get("/info", verifyTokenHandler, userCtl.getUserInfo);
router.post("/disable", verifyTokenHandler, userCtl.disableUser);

module.exports = router;
