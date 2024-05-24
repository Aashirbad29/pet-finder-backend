const express = require("express");
const router = express.Router();
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");
const { create, get, getAll, approveRejectRequest, getMyRequests } = require("../controllers/adoptionController");

router.post("/", [authenticateUser], create);
router.get("/", [authenticateUser, authorizePermissions("admin")], getAll);
router.get("/my-requests", [authenticateUser, authorizePermissions("user")], getMyRequests);
router.get("/:id", [authenticateUser, authorizePermissions("admin")], get);
router.patch("/:id", [authenticateUser, authorizePermissions("admin")], approveRejectRequest);

module.exports = router;
