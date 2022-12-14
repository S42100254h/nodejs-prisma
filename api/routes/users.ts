import express from "express";

const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/", UserController.index);
router.get("/:id", UserController.show);
router.post("/", UserController.create);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
