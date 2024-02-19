import { dirname } from "path";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url)); 

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});