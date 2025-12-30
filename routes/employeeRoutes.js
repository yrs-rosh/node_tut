const express = require("express");
const router = express.Router();
const empController = require("../controllers/employeeController");

router.get("/", empController.getEmployees);
router.get("/:id", empController.getEmployeeByID);

module.exports = router;
