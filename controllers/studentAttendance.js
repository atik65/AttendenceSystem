const {
  giveAttendanceService,
  runningAttendanceService,
  checkAttendanceValidity,
} = require("../service/studentAttendance");

const error = require("../errors/customError");

const getStatus = async (_req, res, next) => {
  try {
    const attendance = await runningAttendanceService();

    if (!attendance) {
      throw error(400, "No running attendance.");
    }

    checkAttendanceValidity(attendance);

    return res.status(200).json(attendance);
  } catch (e) {
    next(e);
  }
};

const getAttendance = async (req, res, next) => {
  const attendanceId = req.params.attendanceId;
  const userId = req.user._id;

  try {
    const studentAttendance = await giveAttendanceService(attendanceId, userId);
    res.status(201).json({
      message: "Attendance given successfully.",
      studentAttendance,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getStatus,
  getAttendance,
};
