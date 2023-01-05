const { Schema, model } = require("mongoose");

const studentAttendanceSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  adminAttendance: {
    type: Schema.Types.ObjectId,
    ref: "AdminAttendance",
  },

  createdAt: Date,
});

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

module.exports = StudentAttendance;
