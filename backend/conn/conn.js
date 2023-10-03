const mongoose = require("mongoose");


const conn = async () =>{
   try {
    await mongoose.connect("mongodb+srv://praveenraju:12345trewq@cluster0.usuqxfi.mongodb.net/")
    .then(() => {
        console.log("mongo connected");
    });
   } catch (error) {
    res.status(400).json({
        message: "Not Connected"
    })
   }
}


conn();