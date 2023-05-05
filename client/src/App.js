import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Users/Login.jsx";
import SignUp from "./components/Users/SignUp.jsx";
import AddEmployee from "./components/Employee/AddEmployee.jsx";
import EditEmployee from "./components/Employee/EditEmployee.jsx";
import EmployeeList from "./components/Employee/EmployeeList.jsx";


function App() {
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/home" || currentPath === "/index.html") {
      window.location.href = "/signup"; // Redirect to the register page
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<EmployeeList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addemployees" element={<AddEmployee />} />
        <Route path="/editemployees" element={<EditEmployee />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
