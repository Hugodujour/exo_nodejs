const express = require("express");
const ArticlesController = require("./articles.controller");
const authMiddleware = require("../../middlewares/auth");
const router = express.Router();

router.post("/", authMiddleware, ArticlesController.create);
router.put("/:id", authMiddleware, ArticlesController.update);
router.delete("/:id", authMiddleware, ArticlesController.delete);
module.exports = router;
