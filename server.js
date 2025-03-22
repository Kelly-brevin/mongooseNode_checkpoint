// Import required modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Create Express app
const app = express();

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection error", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const Person = require("./models/person");

// Create a new person instance
const createPerson = () => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Pasta"],
  });

  // Save the person to the database
  person.save((err, data) => {
    if (err) console.error(err);
    else console.log("Person saved:", data);
  });
};

// Uncomment the function call to create a person
// createPerson();
const createManyPeople = () => {
  const arrayOfPeople = [
    { name: "Alice", age: 25, favoriteFoods: ["Sushi", "Ramen"] },
    { name: "Mary", age: 22, favoriteFoods: ["Burgers", "Fries"] },
    { name: "Michael", age: 35, favoriteFoods: ["Steak", "Salad"] },
  ];

  // Insert multiple documents
  Person.create(arrayOfPeople, (err, people) => {
    if (err) console.error(err);
    else console.log("People added:", people);
  });
};

// Uncomment the function call to create many people
// createManyPeople();
const findPeopleByName = (personName) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) console.error(err);
    else console.log(`People with name ${personName}:`, people);
  });
};

// Uncomment the function call to find people by name
// findPeopleByName("Mary");
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) console.error(err);
    else console.log(`Person who likes ${food}:`, person);
  });
};

// Uncomment the function call to find a person by favorite food
// findOneByFood("Pizza");

const findPersonById = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) console.error(err);
    else console.log("Person found by ID:", person);
  });
};

// Uncomment and replace ID to find a person
// findPersonById("PUT_PERSON_ID_HERE");
const updateFavoriteFood = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) console.error(err);
    else {
      person.favoriteFoods.push("Hamburger");
      person.save((err, updatedPerson) => {
        if (err) console.error(err);
        else console.log("Updated Person:", updatedPerson);
      });
    }
  });
};

// Uncomment and replace ID to update favorite food
// updateFavoriteFood("PUT_PERSON_ID_HERE");
const updateAgeByName = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) console.error(err);
      else console.log("Updated Age:", updatedPerson);
    }
  );
};

// Uncomment to update age
// updateAgeByName("Mary");

const deletePersonById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) console.error(err);
    else console.log("Deleted Person:", removedPerson);
  });
};

// Uncomment to delete a person
// deletePersonById("PUT_PERSON_ID_HERE");

const deletePeopleByName = () => {
  Person.deleteMany({ name: "Mary" }, (err, result) => {
    if (err) console.error(err);
    else console.log("Deleted People:", result);
  });
};

// Uncomment to delete people
// deletePeopleByName();

const searchPeople = () => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 }) // Sort by name
    .limit(2) // Limit results to 2
    .select("-age") // Hide age field
    .exec((err, people) => {
      if (err) console.error(err);
      else console.log("Filtered People:", people);
    });
};

// Uncomment to search
// searchPeople();
