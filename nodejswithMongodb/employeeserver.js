const Employee = require("./models/employee");


const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/sudaksha", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));



const createEmployee = function(name, designation, salary) {
  const employee = new Employee({
    name,
    designation,
    salary
  });

  return employee.save();
};

createEmployee("Nasur", "SE", 987898)
  .then(employee => {
    console.log("> Created new Employee\n", employee);
    
   
    return createEmployee(employee.name,employee.designation,employee.salary);
  })
  .then(identifier => {
    console.log("> Created employee");
  })
  .catch(err => console.log(err));

