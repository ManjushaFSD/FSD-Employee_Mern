import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx';
import EmployeeList from './EmployeeList.jsx';


const Home = () => {
  const [employees, setEmployees] = useState([]);
 

  useEffect(() => {
    // Fetch the list of employees
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getemployees');
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);
  return (
    <div>
      <Header />
      <div>
        <h1>Welcome to the Home Page</h1>
        <EmployeeList/>
      </div>
    </div>
  );
};

export default Home;
