const Customer = require("./models/customer");
const Identifier = require("./models/identifier");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/sudaksha", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));


const createCustomer = function(name, age, gender) {
  const customer = new Customer({
    name,
    age,
    gender
  });

  return customer.save();
};

const createIdentifier = function(cardCode, customer) {
  const identifier = new Identifier({
    cardCode,
    customer
  });

  return identifier.save();
};

createCustomer("innouser", 29, "male")
  .then(customer => {
    console.log("> Created new Customer\n", customer);
    
    const customerId = customer._id.toString();
    return createIdentifier(customerId.substring(0, 10).toUpperCase(), customerId);
  })
  .then(identifier => {
    console.log("> Created new Identifier\n", identifier);
  })
  .catch(err => console.log(err));

