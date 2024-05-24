const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");
const { create, getAll, get, update, remove } = require("../controllers/petController");

router.post("/", [authenticateUser, authorizePermissions("admin")], create);
router.get("/", getAll);
router.get("/:id", get);
router.patch("/:id", [authenticateUser, authorizePermissions("admin")], update);
router.delete("/:id", [authenticateUser, authorizePermissions("admin")], remove);

module.exports = router;
