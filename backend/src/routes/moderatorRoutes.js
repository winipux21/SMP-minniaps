const express = require("express");
const {
  getPendingRequests,
  approveRequest,
  rejectRequest,
} = require("../controllers/moderatorController");
const { checkModeratorRole } = require("../utils/authMiddleware");

const router = express.Router();

// GET: Получить все заявки в статусе "pending"
router.get("/requests", checkModeratorRole, getPendingRequests);

// PATCH: Одобрить заявку
router.patch("/requests/:id/approve", checkModeratorRole, approveRequest);

// PATCH: Отклонить заявку
router.patch("/requests/:id/reject", checkModeratorRole, rejectRequest);

module.exports = router;
