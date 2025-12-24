const express = require("express");

const app = express();

app.use(express.json());

let employees = [
  { id: 1, employee: "Suraj", status: true },
  { id: 2, employee: "Rakesh", status: true },
  { id: 3, employee: "Rohit", status: true },
  { id: 4, employee: "Ashwani", status: true },
];

//root api
app.get("/", (req, res) => {
  res.send("Employee Management");
});

//GET all employees or filter by query
app.get("/employees", (req, res) => {
  const filteredEmp = [...employees];
  const employeeName = req.query.employee;
  if (employeeName) {
    res.json(filteredEmp.filter((e) => e.employee === employeeName));
  }
  res.json(filteredEmp);
});

//GET employee by id
app.get("/employees/:id", (req, res) => {
  const empFind = employees.find((e) => e.id === Number(req.params.id));

  !empFind &&
    res.status(404).json({ message: "No Employee Found with this id" });

  res.json(empFind);
});

//POST employee (single)
app.post("/add", (req, res) => {
  const addedEmp = {
    id: employees.length + 1,
    employee: req.body.employee,
    status: req.body.status,
  };
  employees.push(addedEmp);
  res.status(201).json({
    message: `Employee ${req.body.employee} Added Successfully`,
    added: addedEmp,
  });
  console.log(`Employee ${addedEmp.employee} added`);
});

//POST employee (bulk)
app.post("/addbulk", (req, res) => {
  let assignId =
    employees.length > 0 ? Math.max(...employees.map((e) => e.id)) : 0;
  const addedEmp = req.body.map((e) => {
    assignId++;
    return { id: assignId, ...e };
  });
  employees.push(...addedEmp);
  res.status(201).json({
    message: `Employee Added Successfully`,
    added: addedEmp,
  });
  console.log(`Employee added`);
});

//DELETE an employee
app.delete("/employees/:id", (req, res) => {
  let deletedEmpID = Number(req.params.id);
  const initLength = employees.length;
  console.log(employees, "beforeeeeeeeee");
  employees = employees.filter((e) => e.id !== deletedEmpID);

  if (employees.length === initLength) {
    return res.status(404).json("Employee not found");
  }
  console.log(employees, "afterrrrrrrrr");
  res.json({ message: "Employee deleted successfully", employees: employees });
});

//UPDATE an employee
app.put("/employees/:id", (req, res) => {
  let updateEmpID = Number(req.params.id);
  console.log(req.body, "kkkkkkkkkk");

  const index = employees.findIndex((e) => e.id === updateEmpID);
  if (index === -1)
    res
      .status(404)
      .json({ message: `Employee with id ${updateEmpID} does not exist` });

  employees[index] = {
    id: updateEmpID,
    employee: req.body.employee || employees[index].employee,
    status: req.body.status ?? employees[index].status,
  };
  console.log(employees[updateEmpID], "afterrrrrrrrr");
  res.json({
    message: "Employee Updated successfully",
    employee: employees[index],
  });
});

//Starting server
app.listen(8000, () => {
  console.log("serving on 8000");
});
