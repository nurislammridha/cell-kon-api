const mongoose = require("mongoose");
const UnitSchema = new mongoose.Schema({
  unitName: {
    type: String,
    require: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Unit = mongoose.model("Unit", UnitSchema);
