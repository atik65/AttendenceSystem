const error = require("../errors/customError");
const AdminAttendance = require("../models/AdminAttendance");
const { addMinutes, isAfter } = require("date-fns");

const attendanceEnableService = async ({ timeLimit }) => {
  const running = await runningAttendanceService();

  if (running) {
    throw error(400, "Already running an attendance.");
  }
  const attendance = new AdminAttendance({
    timeLimit: timeLimit ?? timeLimit,
  });

  return attendance.save();
};

const findAttendanceById = (id) => {
  return AdminAttendance.findOne({ _id: id });
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
  attendanceEnableService,
  findAttendanceById,
  runningAttendanceService,
  checkAttendanceValidity,
};
