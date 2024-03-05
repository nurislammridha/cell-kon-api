const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: [true, 'Please Add User Name'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'Please add a password'],
  },

});
module.exports = Admin = mongoose.model("Admin", AdminSchema);
