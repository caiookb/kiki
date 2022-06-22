const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    default: null,
  },
  mental_health_stage: {
    type: String,
    default: null,
  },
  behaviour_quiz: {
    type: String,
    default: null,
  },
  flow_status: {
    type: String,
    default: null,
  },
  hiv_status: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

StatusSchema.pre("save", async function (next) {
  return next();
});

module.exports = mongoose.model("Status", StatusSchema);
