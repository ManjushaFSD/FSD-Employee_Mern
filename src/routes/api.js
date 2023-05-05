const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmployeeData = require("../models/employeeModel");
const UserData = require("../models/userModel"); 
// Signup endpoint
router.post("/signup", async (req, res) => {
    try {
      const { name, email, username, password, role } = req.body;
  
      // Check if the username or email already exists
      const existingUser = await UserData.findOne({
        $or: [{ username: username }, { email: email }],
      });
      if (existingUser) {
        return res.status(409).json({ message: "Username or email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new UserData({
        name,
        email,
        username,
        password: hashedPassword,
        role: role || 'user', // Set the role as 'user' by default if not specified
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.log(err)
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username exists
      const user = await UserData.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Create a JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        "mysecretkey123" // Replace with your own secret key
      );
  
      console.log("Retrieved User:", user);
      console.log("Generated Token:", token);
  
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

  router.get("/userRole", async (req, res) => {
    try {
      // Verify and decode the token
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, "mysecretkey123");
  
      console.log("Decoded Token:", decodedToken);
  
      // Retrieve the user
      const user = await UserData.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("Retrieved User:", user);
  
      res.status(200).json({ role: user.role });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  

  router.post("/logout", async (req, res) => {
    try {
      // Retrieve the token from the request headers
      const token = req.headers.authorization.split(" ")[1];
  
      // Verify and decode the token
      const decodedToken = jwt.verify(token, "mysecretkey123");
  
      // Remove the token from localStorage
      localStorage.removeItem('token');
  
      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  module.exports = router;

  
//employee routes

// Get all employees
router.get("/getemployees", async (req, res) => {
    try {
      const employees = await EmployeeData.find();
      res.status(200).json(employees);
    } catch (err) {
        console.log(err)
     
    }
  });
  
  // Create a new employee (Only accessible by admin)
  router.post("/addemployees", async (req, res) => {
    try {
      const { name, salary, designation, location } = req.body;
  
    // Verify and decode the token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "mysecretkey123"); 
      // Check if the user is an admin
      if (decodedToken.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
  
      const newEmployee = new EmployeeData({
        name,
        salary,
        designation,
        location,
      });
  
      await newEmployee.save();
  
      res.status(201).json({ message: "Employee created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error",stack: err.stack  });
    }
  });
  
  // Get a specific employee by ID
  router.get("/getemployees/:id", async (req, res) => {
    try {
      const employee = await EmployeeData.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Update an employee (Only accessible by admin)
  router.post("/updateemployees/:id", async (req, res) => {
    try {
      const { name, salary, designation, location } = req.body;
   // Verify and decode the token
   const token = req.headers.authorization.split(' ')[1];
   const decodedToken = jwt.verify(token, "mysecretkey123"); 
     // Check if the user is an admin
     if (decodedToken.role !== "admin") {
       return res.status(403).json({ message: "Access denied" });
     }
  
      const updatedEmployee = await EmployeeData.findByIdAndUpdate(
        req.params.id,
        {
          name,
          salary,
          designation,
          location,
        },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json({ message: "Employee updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Delete an employee (Only accessible by admin)
  router.delete("/deleteemployees/:id", async (req, res) => {
    try {
     // Verify and decode the token
     const token = req.headers.authorization.split(' ')[1];
     const decodedToken = jwt.verify(token, "mysecretkey123"); 
       // Check if the user is an admin
       if (decodedToken.role !== "admin") {
         return res.status(403).json({ message: "Access denied" });
       }
  
      const deletedEmployee = await EmployeeData.findByIdAndRemove(req.params.id);
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
    module.exports = router