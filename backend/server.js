const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const multer = require('multer');

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

const ProduceRouter = require("./routes/Produce.routes");
app.use("/api/produce", ProduceRouter); 
