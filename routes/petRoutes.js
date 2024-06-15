const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");
const { create, getAll, get, update, remove, uploadPhoto } = require("../controllers/petController");
const upload = require("../middleware/upload");

router.post("/", [authenticateUser, authorizePermissions("admin")], create);
router.get("/", getAll);
router.get("/:id", get);
router.patch("/:id", [authenticateUser, authorizePermissions("admin")], update);
router.delete("/:id", [authenticateUser, authorizePermissions("admin")], remove);
router.post("/upload", upload.single("photo"), uploadPhoto);

module.exports = router;
