import React, { useState, useEffect } from "react";
import axios from 'axios';
const App = () => {
  const [employee_table, setUsers] = useState([]);
  const [Name, setName] = useState('');
  const [emp_code, setCode] = useState('');
  const [Salary, setSalary] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/api/read')
      .then((response) => {
        console.log("Response", response.data);
        setUsers(response.data);

      });
  }, []);
  const handleCreate = () => {
    axios.post('http://localhost:5000/api/create', { Name, emp_code, Salary }).then(() => {
      axios.get('http://localhost:5000/api/read').then((response) => {
        setUsers(response.data);
      });
    });
  };
  const handleUpdate = (emp_id) => {
    axios.put('http://localhost:5000/api/update/${emp_id}', { Name, emp_code, Salary }).then(() => {
      axios.get('http://localhost:5000/api/read').then((response) => {
        setUsers(response.data);
      });
    });
  };
  const handleDelete = (emp_id) => {
    axios.put('http://localhost:5000/api/delete/${emp_id}', { Name, emp_code, Salary }).then(() => {
      axios.get('http://localhost:5000/api/read').then((response) => {
        setUsers(response.data);
      });
    });
  };
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {employee_table.map((employee_table) => (
          <li key={employee_table._id} >{employee_table.Name},{employee_table.emp_code},{employee_table.Salary} years
            <button onClick={() => handleUpdate(employee_table.emp_id)}>Update</button>
            <button onClick={() => handleDelete(employee_table.emp_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
