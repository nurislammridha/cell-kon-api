const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    require: true,
  },
  categoryImg: {
    url: {
      type: String,
      require: true,
    },
    publicId: {
      type: String,
      require: true,
    }
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Category = mongoose.model("Category", CategorySchema);
