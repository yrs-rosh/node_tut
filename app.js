const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
const mainRoutes = require("./routes/mainRoutes");

app.use(express.json());

app.use("/", mainRoutes);
app.use("/api/employees", employeeRoutes);

app.listen(8000, () => console.log("running server on 8000"));
