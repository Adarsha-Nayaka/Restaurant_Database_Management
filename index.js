import { dirname } from "path";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cors from "cors";
import pkg from 'pg';
const { Client } = pkg;

const app = express();
const port = 3000;
app.use(cors());

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password",
    database: "restaurant"
})
  
client.connect()
    .then(() => console.log("Connected successfully"))
    .catch(err => console.error("Connection error", err));

const __dirname = dirname(fileURLToPath(import.meta.url)); 

app.get('/submit1', (req, res) => {

    let orderString = req.query.order;
    let orderDict = {};
    if (orderString) {
        const orderArr = orderString.split(',');

        orderArr.forEach(item => {
            let pair = item.split(':');
            if (pair.length === 2) {
                let key = pair[0].trim();
                let value = pair[1].trim();
                orderDict[key] = value;
            }
        });
    }
    console.log(orderDict);
    let cname = req.query.customername;
    let pno = req.query.phone_no;
    console.log(cname, pno);

    client.query(`INSERT INTO customers (customer_name, phone_number) VALUES ($1, $2);`,
    [cname, pno],(err1, ret1)=>{
        if(err1){
            res.json({error: err1.message});
        }
    })
    for (let item in orderDict){
        if (orderDict[item] !== 0){
            let total = orderDict[item] * 12.99;
            let quantity = orderDict[item];
            client.query(`
            INSERT INTO Orders (customer_id, item_name, quantity, tot_price)
            SELECT customer_id, $2, $3, $4
            FROM Customers
            WHERE phone_number = $1;
        `, [pno, item, quantity, total])
            .then(() => console.log("Order inserted successfully"))
            .catch(err => console.error("Error inserting order", err))
        }
    }
});

app.get('/submit2', (req, res) => {
    let Item = req.query.newItem;
    let Value = req.query.newValue;

    console.log(Item, Value);
     // Assuming you want to send a simple success response
     res.status(200).json({ message: "Order submitted successfully." });
});


app.get('/submit3', (req, res) => {
    let custName = req.query.customerName;
    let date = req.query.date;
    let time = req.query.time;
    let guests = req.query.guests;
    let phone = req.query.phone;

    console.log(custName, date, time, guests, phone);

    // Assuming you want to send a simple success response
    res.status(200).json({ message: "Reservation submitted successfully." });
});



app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});
