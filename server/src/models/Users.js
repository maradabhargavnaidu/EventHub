const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mail: { type: String, lowercase: true, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["host", "attendee"] },
    organization: {
      type: String,
      required: function () {
        return this.role === "host";
      },
    },
  },
  { timestamps: true, strict: false }
);

// Compound index to ensure unique mail per role
userSchema.index({ mail: 1, role: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
