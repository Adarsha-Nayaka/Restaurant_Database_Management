import { dirname } from "path";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cors from "cors";
import pkg from 'pg';
const { Client } = pkg;

const ___dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// app.get('/', (req, res)=>{
//     res.sendFile(___dirname + "/public/index.html");
// });

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "2003",
    database: "restaurant"
})
  
client.connect()
    .then(() => console.log("Connected successfully"))
    .catch(err => console.error("Connection error", err));

// const __dirname = dirname(fileURLToPath(import.meta.url)); 

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
        let quantity = orderDict[item];
        if (quantity !== '' && quantity !== 0){
            let total = orderDict[item] * 12.99;
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
    let item = req.query.newItem;
    let value = req.query.newValue;

    // Upsert (insert or update) the item in the Inventory table
    client.query(`
        INSERT INTO Inventory (item_name, item_value)
        VALUES ($1, $2)
        ON CONFLICT (item_name) DO UPDATE
        SET item_value = EXCLUDED.item_value;
    `, [item, value])
    .then(() => {
        console.log("Item inserted/updated successfully");
        res.status(200).json({ message: "Item inserted/updated successfully." });
    })
    .catch(err => {
        console.error("Error inserting/updating item", err);
        res.status(500).json({ error: "Failed to insert/update item." });
    });
});



app.get('/submit3', (req, res) => {
    let custName = req.query.customerName;
    let date = req.query.date;
    let time = req.query.time;
    let guests = req.query.guests;
    let phone = req.query.phone;

    client.query(`INSERT INTO customers (customer_name, phone_number) VALUES ($1, $2);`,
    [custName, phone],(err1, ret1)=>{
        if(err1){
            res.json({error: err1.message});
        }
    })

    
    client.query(`
            INSERT INTO reservations (customer_id, reservation_date, reservation_time, number_of_people)
            SELECT customer_id, $2, $3, $4
            FROM Customers
            WHERE phone_number = $1;
        `, [phone, date, time, guests])
            .then(() => console.log("Order inserted successfully"))
            .catch(err => console.error("Error inserting order", err))

    // Assuming you want to send a simple success response
    res.status(200).json({ message: "Reservation submitted successfully." });
});



app.get('/submit4', (req, res) => {
    let staffName = req.query.staffName;
    let designation = req.query.designation;
    let contact = req.query.contact;

    // Assuming you have already initialized your database connection
    client.query(`INSERT INTO staff (staff_name, designation, contact) VALUES ($1, $2, $3);`,
    [staffName, designation, contact], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ success: true });
        }
    });
});

app.get('/retrieve', async (req, res, next) => {
    try {
        const customers = await client.query('SELECT * FROM Customers');
        const orders = await client.query('SELECT * FROM Orders');
        const staff = await client.query('SELECT * FROM Staff');
        const reservations = await client.query('SELECT * FROM reservations');

        const cust = customers.rows;
        const ord = orders.rows;
        const stf = staff.rows;
        const resv = reservations.rows;
        console.log(stf);

        res.json({ customers: cust, orders: ord, staff: stf, reservations: resv });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});
