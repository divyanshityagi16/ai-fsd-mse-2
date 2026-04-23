const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

// ✅ FIXED CORS
app.use(cors({
  origin: "*"
}));

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/items", require("./routes/items"));

// ✅ FIXED PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));