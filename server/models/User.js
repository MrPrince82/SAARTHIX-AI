const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    education: {
      type: String,
      default: ""
    },

    skills: {
      type: [String],
      default: []
    },

    targetRole: {
      type: String,
      default: ""
    },

    experience: {
      type: String,
      default: ""
    },

    projects: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);