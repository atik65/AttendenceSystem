const error = require("../errors/customError");
const {
  attendanceEnableService,
  runningAttendanceService,
} = require("../service/adminAttendance");
const { checkAttendanceValidity } = require("../service/adminAttendance");

const getEnable = async (req, res, next) => {
  let timeLimit = req.query.timeLimit;
  if (timeLimit) timeLimit = Number(timeLimit);

  try {
    const attendance = await attendanceEnableService({ timeLimit });
    if (!attendance) {
      throw error(400, "Failed to create new attendance.");
    }

    return res.status(201).json({
      message: "Attendance created successfully.",
      attendance,
    });
  } catch (e) {
    next(e);
  }
};

const getDisable = async (_req, res, next) => {
  try {
    const attendance = await runningAttendanceService();

    if (!attendance) {
      throw error(404, "No attendance running.");
    }
    if (attendance.status == "COMPLETED") {
      throw error(400, "Already Completed.");
    }

    attendance.status = "COMPLETED";

    await attendance.save();

    return res.status(200).json(attendance);
  } catch (e) {
    next(e);
  }
};

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

module.exports = {
  getEnable,
  getDisable,
  getStatus,
};
