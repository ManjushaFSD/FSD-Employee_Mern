import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditEmployee.css';
import { useNavigate } from 'react-router-dom';

const EditEmployee = ({ employeeId }) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
const navigate = useNavigate()
  useEffect(() => {
    // Fetch employee details based on the employeeId
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getemployees/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const { name, salary, designation, location } = response.data;
        setName(name);
        setSalary(salary);
        setDesignation(designation);
        setLocation(location);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployeeDetails();
  }, [employeeId]);

  const handleUpdate = async () => {
    try {
      await axios.post(
        `http://localhost:3001/api/updateemployees/${employeeId}`,
        {
          name,
          salary,
          designation,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Salary:
          <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </label>
        <label>
          Designation:
          <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
      </form>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onclose}>Cancel</button>
    </div>
  );
};

export default EditEmployee;
