const express = require("express");
const {
  authorizeRole,
  authenticateUser,
} = require("../middlewares/middleware");
const createEvent = require("../controllers/createEvent.controller");
const getEvent = require("../controllers/getEvent.controller");
const getYourEvents = require("../controllers/getYourEvents.controller");
const getEventById = require("../controllers/getEventById.controller");
const router = express.Router();

router.post(
  "/create-event",
  authenticateUser,
  authorizeRole(["host"]),
  createEvent
);
router.get(
  "/get-events",
  authenticateUser,
  authorizeRole(["attendee"]),
  getEvent
);
router.get(
  "/get-your-events",
  authenticateUser,
  authorizeRole(["host"]),
  getYourEvents
);
router.get(
  "/get-event-by-id",
  authenticateUser,
  authorizeRole(["host", "attendee"]),
  getEventById
);
module.exports = router;
