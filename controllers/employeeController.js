let employees = [
  { id: 1, employee: "Suraj", status: true },
  { id: 2, employee: "Rakesh", status: true },
  { id: 3, employee: "Rohit", status: true },
  { id: 4, employee: "Ashwani", status: true },
];

//GET all employees or filter by query
exports.getEmployees = (req, res) => {
  const filteredEmp = [...employees];
  const employeeName = req.query.employee;
  if (employeeName) {
    res.json(filteredEmp.filter((e) => e.employee === employeeName));
  }
  res.json(filteredEmp);
};

exports.getEmployeeByID = (req, res) => {
  const empFind = employees.find((e) => e.id === Number(req.params.id));

  if (!empFind) {
    return res.status(404).json({ message: "No Employee Found with this id" });
  }

  res.json(empFind);
};
