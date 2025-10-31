const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Item = require("./models/item");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
