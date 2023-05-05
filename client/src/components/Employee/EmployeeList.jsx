import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditEmployee from './EditEmployee.jsx';
import Header from '../Header/Header.jsx';
import './EmployeeList.css';
import { Navigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    // Fetch employees from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getemployees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch user role from the backend
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/userRole', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
    fetchUserRole();
  }, []);

  const handleEdit = (employeeId) => {
    setEditEmployeeId(employeeId);
    Navigate('/editemployees')
  };

  const handleCloseEdit = () => {
    setEditEmployeeId(null);
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteemployees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Remove the deleted employee from the list
      setEmployees(employees.filter((employee) => employee._id !== employeeId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="employee-list">
      <Header />
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Designation</th>
            <th>Location</th>
            {userRole === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.salary}</td>
              <td>{employee.designation}</td>
              <td>{employee.location}</td>
              {userRole === 'admin' && (
                <td>
                  <button onClick={() => handleEdit(employee._id)}>
                    <i className="bi bi-pen-fill"></i> Edit
                  </button>
                  <button onClick={() => handleDelete(employee._id)}>
                    <i className="bi bi-trash3-fill"></i> Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {editEmployeeId && <EditEmployee employeeId={editEmployeeId} onClose={handleCloseEdit} />}
    </div>
  );
};

export default EmployeeList;
