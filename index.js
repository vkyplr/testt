const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.get("/", (req, res) => res.send("hello"));
// Register Api
app.post("/register", (req, res) => {
  req.body = JSON.parse(Object.keys(req.body)[0]);
  let allUsers = JSON.parse(fs.readFileSync("users.json"));
  if (allUsers.users[req.body.email] !== undefined) {
    let response = {
      message: "email already exists",
      status: false,
      data: {}
    };
    return res.status(200).json(response);
  }
  if (req.body.name && req.body.email && req.body.password) {
    if (
      req.body.name === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      let response = {
        message: "All fields are required",
        status: false,
        data: {}
      };
      return res.status(200).json(response);
    }
    let u = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    };
    allUsers.users[u.email] = u;
    fs.writeFile("users.json", JSON.stringify(allUsers), e => {});
    let response = {
      message: "User registered successfully!",
      status: true,
      data: {
        name: u.name,
        email: u.email
      }
    };
    delete u;
    return res.status(200).json(response);
  } else {
    let response = {
      message: "All fields are required",
      status: false,
      data: {}
    };
    return res.status(200).json(response);
  }
});

// Signin Api
app.post("/login", (req, res) => {
  req.body = JSON.parse(Object.keys(req.body)[0]);
  if (req.body.email && req.body.password) {
    if (req.body.email == "" || req.body.password == "") {
      let response = {
        message: "All fields are required",
        status: false,
        data: {}
      };
      return res.status(200).json(response);
    }
    let allUsers = JSON.parse(fs.readFileSync("users.json"));
    if (allUsers.users[req.body.email] === undefined) {
      let response = {
        message: "User does not exists",
        status: false,
        data: {}
      };
      return res.status(200).json(response);
    }
    if (allUsers.users[req.body.email].password !== req.body.password) {
      let response = {
        message: "Invalid Password",
        status: false,
        data: {}
      };
      return res.status(200).json(response);
    }
    delete allUsers.users[req.body.email].password;
    let response = {
      message: "User logged in succesfully",
      status: true,
      data: allUsers.users[req.body.email]
    };
    return res.status(200).json(response);
  } else {
    let response = {
      message: "All fields are required",
      status: false,
      data: {}
    };
    return res.status(200).json(response);
  }
});

app.listen(8000);
