import express from "express";

const router = express.Router();

const PostController = require("../controllers/PostController");

router.get("/", PostController.index);
router.get("/:id", PostController.show);
router.post("/", PostController.create);
router.patch("/:id", PostController.update);
router.delete("/:id", PostController.delete);

module.exports = router;
