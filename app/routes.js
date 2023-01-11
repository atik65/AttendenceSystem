const router = require("express").Router();
const generalRoute = require("../routes/generalRoute");
const authRoute = require("../routes/authentication");
const userRoute = require("../routes/users");
const authenticate = require("../middleware/authenticate");
const adminAttendanceRouter = require("../routes/adminAttendance");
const studentAttendanceRouter = require("../routes/studentAttendance");

router.use(generalRoute);
router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", authenticate, userRoute);
router.use("/api/v1/admin/attendance", authenticate, adminAttendanceRouter);
router.use("/api/v1/student/attendance", authenticate, studentAttendanceRouter);

module.exports = router;
