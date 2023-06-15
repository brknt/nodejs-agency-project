const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
var methodOverride = require("method-override");
const ejs = require("ejs");

const pageRoute = require("./routes/pageRoute");
const photoRoute = require("./routes/photoRoute");

const app = express();

//CONNECT MONGODB
mongoose
  .connect("mongodb://localhost/agency-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Succesful.");
  })
  .catch((err) => {
    console.log(`Database connection failed : ${err}`);
  });

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// ROUTER
app.use("/", pageRoute.routes);
app.use("/photos", photoRoute.routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
