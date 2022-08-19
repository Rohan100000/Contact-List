// require the library
const mongoose = require("mongoose");

// mongoose uses connect function to connect to database contact_list_db.
mongoose.connect("mongodb://localhost/contact_list_db");

// used to make use of / acquire the connection to the contact_list_db database.(to check if it is successful)
const db = mongoose.connection;

// error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running then print the message.
db.once("open", function () {
  console.log("Successfully connected to the database.");
});
