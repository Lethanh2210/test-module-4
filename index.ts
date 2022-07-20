import express from "express";
import bodyParser from "body-parser";
import path from "path";
const connectDb = require("./src/config/db");
import session from "express-session";
import cookieParser from 'cookie-parser';
import employeeRoutes from "./src/routes/employee.router"
import {EmployeeModel} from "./src/models/employee.model";


const PORT = 3000;
const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb().catch(r => {
    console.log(r.message);
});




app.use('/public', express.static(path.join(__dirname,'../src', 'public')));
app.use('/employee', employeeRoutes);
app.use((req,res,next) => {
    res.render('home');
});

app.listen(PORT, function() {
    console.log("listening on *:3000");
});