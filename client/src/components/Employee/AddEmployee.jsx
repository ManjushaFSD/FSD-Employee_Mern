import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import("./AddEmployee.css")

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user role from the backend API
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/userRole', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.log(error.response.data);
        // TODO: Handle error
      }
    };

    fetchUserRole();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the employee object
    const newEmployee = {
      name,
      salary,
      designation,
      location,
    };

    try {
      // Make the API request to add the employee
      const response = await axios.post('http://localhost:3001/api/addemployees', newEmployee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data);
      navigate('/');
      // TODO: Handle success message or redirect to the employee list page
    } catch (error) {
      console.log(error.response.data);
      // TODO: Handle error
    }
  };

  return (
    <div className="add-employee-container">
      <h1>Add Employee</h1>
      {userRole === 'admin' ? (
        <form onSubmit={handleSubmit} className="add-employee-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter salary"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation:</label>
            <input
              type="text"
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Enter designation"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Add Employee
          </button>
        </form>
      ) : (
        <p>Access denied. You need to be an admin to add employees.</p>
      )}
    </div>
  );
};

export default AddEmployee;
