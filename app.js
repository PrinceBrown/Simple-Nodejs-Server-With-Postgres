const express = require('express');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const client = require('./connection')





app.get('/', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            res.json({ myUsers: result.rows })
        } else{
            console.log({ err: err })
        } 
    })
    client.end;
   
})



app.get('/users/:id', (req, res) => {
    client.query(`SELECT * FROM users where id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send({ myUsers: result.rows })
        } else{
            console.log({ err: err })
        } 
    })
    client.end;
   
})


app.post('/users', (req, res) => {

    const { id, firstname, lastname, location } = req.body;

    console.log(req.body)


    // Another way to insert data into the database
    // client.query('INSERT INTO users (id, firstname, lastname, location) VALUES ($1, $2, $3, $4)', [id, firstname, lastname, location], (err, result) => {

    client.query(`INSERT INTO users (id, firstname, lastname, location) VALUES (${id}, '${firstname}', '${lastname}', '${location}')`, (err, result) => {
        if (!err) {
            res.json({ 
                message: 'Insertion was succesful',
                result: result
             })
        } else{
            console.log({ err: err })
        } 
    })
    client.end;
   
})



app.put('/users/', (req, res) => {

    const { id, firstname, lastname, location } = req.body;
 
    // Another way to update data into the database
    // client.query(`UPDATE users SET firstname='${firstname}', lastname='${lastname}', location='${location}' WHERE id=${id}`, (err, result) => {

    client.query(`UPDATE users SET firstname=$1, lastname=$2, location=$3 WHERE id=$4`, [firstname, lastname, location, id], (err, result) => {

        if (!err) {
            res.json({
                message: 'Update was succesful',
                result: result
            })
        } else{
            console.log({ err: err })
        }
    })
    client.end;

})



app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    // Another way to delete data into the database

    // client.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {

    client.query(`DELETE FROM users WHERE id=$1`, [id], (err, result) => {

        if (!err) {
            res.json({
                message: 'Delete was succesful',
                result: result
            })
        } else{
            console.log({ err: err })
        }
    })
    client.end;

})


 



app.listen(port, console.log(`Example app listening at http://localhost:${port}`))

