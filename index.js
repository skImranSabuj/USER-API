const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const userRoute = require("./routes/user.route.js");

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);



app.listen(port, () =>console.log("USER-API Server running at PORT:",port))