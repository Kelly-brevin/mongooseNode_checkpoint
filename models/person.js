const mongoose = require("mongoose");

// Define the schema for a Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is required
  age: { type: Number, default: 18 },
  favoriteFoods: { type: [String], default: [] }, // Array of strings
});

// Create the Person model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
