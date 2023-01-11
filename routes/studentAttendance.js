const router = require("express").Router();
const studentAttendanceController = require("../controllers/studentAttendance");

router.get("/status", studentAttendanceController.getStatus);
router.get("/:attendanceId", studentAttendanceController.getAttendance);

module.exports = router;
