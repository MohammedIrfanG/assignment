const express = require ("express");
const cors = require ("cors");
const bodyParser = require ("body-parser");
const config = require ("../config/config.json");
const trucks = require ("../controllers/trucks");
const port = process.env.port || config.Application.port;
const app = express();
//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/",trucks);

app.listen(port,()=> console.log(`server is running on port : ${port}`));