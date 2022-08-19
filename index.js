const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 8000;
const db = require("./config/mongoose");
const contact = require("./models/contact");
const { Http2ServerRequest } = require("http2");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use - Middleware
// express.urlencoded() - This is a built-in middleware function in body-parser.
// It parses incoming requests with urlencoded payloads
// and is based on body-parser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("assets"));

// // Middleware 1:
// app.use(function (request, response, next) {
//   request.myName = "Rohan";
//   console.log("middleware 1 called", request.myName);
//   next();
// });

// // Middleware 2:
// app.use(function (request, response, next) {
//   console.log(request.myName);
//   request.myName = "Bhau";
//   console.log("middleware 2 called", request.myName);
//   next();
// });

var contactList = [
  {
    name: "Rohan",
    phone: "9753801920",
  },
  {
    name: "Rimjhim",
    phone: "8886426191",
  },
  {
    name: "Bhau",
    phone: "9865321245",
  },
];

app.get("/", function (request, response) {
  contact.find({}, function (error, contacts) {
    if (error) {
      console.log("error in fetching contacts from db.");
      return;
    }

    return response.render("home", {
      // response.locals
      title: "Contact list",
      contact_list: contacts,
    });
  });
});

app.get("/practice", function (request, response) {
  return response.render("practice", {
    // response.locals
    title: "Practice!",
  });
});

app.post("/create-contact", function (request, response) {
  // contactList.push({
  //   name: request.body.name,
  //   phone: request.body.phone,
  // });
  // OR USE:
  // contactList.push(request.body);
  contact.create(
    {
      name: request.body.name,
      phone: request.body.phone,
    },
    function (error, newContact) {
      if (error) {
        console.log("Error in creating a contact");
        return;
      }
      console.log("*********", newContact);
    }
  );
  return response.redirect("/");
});

// used if string params were used to send phone in url:
// app.get("/delete-contact/:phone", function (request, response){

app.get("/delete-contact", function (request, response) {
  // console.log(request.params);
  // get the id from query in the url
  console.log(request.query);
  let id = request.query.id;

  // find the contact in the database using id and delete it.
  contact.findByIdAndDelete(id, function (error) {
    if (error) {
      console.log("Error in deleting an object from the database.");
      return;
    }
  });
  return response.redirect("back");
});

app.listen(port, function (error) {
  if (error) {
    console.log("Error in running the server:", error);
  } else {
    console.log("Express server is running on port:", port);
  }
});
