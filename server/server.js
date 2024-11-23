const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config()
const Authentication = require('./controller/Authenication.controller')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/auth', Authentication)

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error.message);
  });

