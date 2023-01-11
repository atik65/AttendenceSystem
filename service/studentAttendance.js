const StudentAttendance = require("../models/StudentAttendance");
const error = require("../errors/customError");
const { findAttendanceById } = require("./adminAttendance");
const { addMinutes, isAfter } = require("date-fns");
const AdminAttendance = require("../models/AdminAttendance");

const giveAttendanceService = async (attendanceId, userId) => {
  const attendance = await findAttendanceById(attendanceId);

  if (!attendance) {
    throw error(400, "Invalid attendance ID.");
  }

  const timeLimit = addMinutes(
    new Date(attendance.createdAt),
    attendance.timeLimit
  );
  const timeExpired = isAfter(new Date(), timeLimit);
  if (timeExpired) {
    attendance.status = "COMPLETED";

    await attendance.save();
  }

  const attendanceGiven = await findAttendanceByAttendanceId(
    attendanceId,
    userId
  );

  if (attendanceGiven) {
    throw error(400, "Attendance already given for this attendance ID.");
  }

  if (attendance.status != "RUNNING") {
    throw error(400, "No running attendance.");
  }

  const studentAttendance = new StudentAttendance({
    userId: userId,
    adminAttendance: attendanceId,
  });

  return studentAttendance.save();
};

const findAttendanceByAttendanceId = (attendanceId, userId) => {
  return StudentAttendance.findOne({
    adminAttendance: attendanceId,
    userId: userId,
  });
};

const runningAttendanceService = () => {
  return AdminAttendance.findOne({ status: "RUNNING" });
};

const checkAttendanceValidity = async (attendance) => {
  const timeLimit = addMinutes(
    new Date(attendance.createdAt),
    attendance.timeLimit
  );
  const timeExpired = isAfter(new Date(), timeLimit);
  if (timeExpired) {
    attendance.status = "COMPLETED";

    await attendance.save();
  }
};

module.exports = {
  giveAttendanceService,
  runningAttendanceService,
  checkAttendanceValidity,
};
