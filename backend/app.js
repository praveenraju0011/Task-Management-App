const express = require("express");
require("./conn/conn.js")
const auth = require("./routes/auth.js");

const list = require("./routes/list.js");

const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());












app.use("/api/v1", auth);
app.use("/api/v2", list);

const PORT = 1000;
app.listen(PORT, () =>{
    console.log(`Server started at ${PORT}`);
})