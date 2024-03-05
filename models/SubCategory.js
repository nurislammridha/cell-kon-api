const mongoose = require("mongoose");
const SubCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    require: true,
  },
  categoryName: {
    type: String,
    require: true,
  },
  categoryId: {
    type: String,
    require: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = SubCategory = mongoose.model("SubCategory", SubCategorySchema);
