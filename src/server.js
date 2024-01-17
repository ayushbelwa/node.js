
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyparser.json());
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee"
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('DB connection mysql');
    }
});

//
app.post("/api/create", (res, req) => {
    const { Name, emp_code, Salary } = req.body;
    const INSERT_QUERY = `INSERT INTO employee_table(Name,emp_code,Salary) VALUES ('?,?')`;
    connection.query(INSERT_QUERY, [Name, emp_code, Salary], (err, result) => {
        if (err) throw err;
        res.send('Data insertted sucessfully');
    })
});
app.get('/api/read', (req, res) => {
    const SELECT_QUERY = 'SELECT * FROM employee_table';
    connection.query(SELECT_QUERY, (err, result) => {
        if (err) throw err;
        res.send(result);
    })

});
app.put('/api/update/:id', (req, res) => {
    const { Name, emp_code, Salary } = req.body;
    const { emp_id } = req.params;
    const UPDATE_QUERY = `UPDATE  employee_table SET Name=? emp_id=? Salary=? WHRER emp_id=?`;
    connection.query(UPDATE_QUERY, [Name, emp_code, Salary, emp_id], (err, result) => {
        if (err) throw err;
        res.send('Data update sucessfully');
    })
});
app.put('/api/delete/:id', (req, res) => {
    const { emp_id } = req.params;
    const DELETE_QUERY = `DELETE FROM  employee_table WHRER emp_id=?`;
    connection.query(DELETE_QUERY, [emp_id], (err, result) => {
        if (err) throw err;
        res.send('Data delete sucessfully');
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})