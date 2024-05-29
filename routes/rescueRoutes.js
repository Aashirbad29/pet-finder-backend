const express = require("express");
const router = express.Router();
const {
  createRescue,
  getRescue,
  getAllRescues,
  getMyRescues,
  approveRejectRescue,
} = require("../controllers/RescueController");
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, authorizePermissions("user"), createRescue)
  .get(authenticateUser, authorizePermissions("admin"), getAllRescues);

router.route("/my-rescues").get(authenticateUser, authorizePermissions("user"), getMyRescues);

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getRescue)
  .patch(authenticateUser, authorizePermissions("admin"), approveRejectRescue);

module.exports = router;
