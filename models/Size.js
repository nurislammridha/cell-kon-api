const mongoose = require("mongoose");
const SizeSchema = new mongoose.Schema({
  unitName: {
    type: String,
    require: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Size = mongoose.model("Size", SizeSchema);
