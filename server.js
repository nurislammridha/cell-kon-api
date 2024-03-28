const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();
const cors = require("cors");
const app = express();
//Connect Database//git
const db = require('./config/db')

// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
//Initial middleware
app.use(express.json({ extended: false }));
app.use(express.static("up"));
app.get("/", (req, res) => res.send("API Running1"));
//Define Routes
//cors policy
app.use(cors());
app.options("*", cors());
app.use("/v1/admin/login", require("./routes/admin"));
app.use("/v1/brand", require("./routes/brand"));
app.use("/v1/buyer", require("./routes/buyer"));
app.use("/v1/campaign", require("./routes/campaign"));
app.use("/v1/cart", require("./routes/cart"));
app.use("/v1/category", require("./routes/category"));
app.use("/v1/color", require("./routes/color"));
app.use("/v1/love", require("./routes/love"));
app.use("/v1/order", require("./routes/order"));
app.use("/v1/product", require("./routes/product"));
app.use("/v1/seller", require("./routes/seller"));
app.use("/v1/size", require("./routes/size"));
app.use("/v1/sub-category", require("./routes/subCategory"));
app.use("/v1/unit", require("./routes/unit"));
app.use("/v1/helper", require("./routes/helper"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
