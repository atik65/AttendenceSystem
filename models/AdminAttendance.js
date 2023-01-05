const { Schema, model } = require("mongoose");

const adminAttendanceSchema = new Schema({
  status: String,
  timeLimit: Number,
  createdAt: Date,
});

const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);

module.exports = AdminAttendance;
