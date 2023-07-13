const express = require("#configs/express");
const { verifyTokenHandler } = require("#middlewares/verifyTokenHandler");
const authCtl = require("#controllers/auth.controller");

const router = express.Router();

router.get("/", verifyTokenHandler, authCtl.auth);
router.post("/login", authCtl.login);
router.post("/register", authCtl.register);
router.post("/logout", authCtl.logout);

module.exports = router;
