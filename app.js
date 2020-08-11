if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

mongoose
    .connect(process.env.DATABASE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    })
    .then((success) => console.log("Successfully connected"))
    .catch((err) => console.log(`Error Occured at ${err}`));

// Set Up view engine
app.set("view engine", "ejs");

// Set Public and static files directory;
app.use(express.static("public"));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// ejs Layouts
app.set("layout", "layouts/layout");
app.use(expressLayouts);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Method Override
app.use(methodOverride("_method"));

// Import MiddleWares
const { isSignedIn } = require("./middlewares/auth");

// All Routes
const homeRouter = require("./controllers/home");
const mainRouter = require("./controllers/main");
const productRouter = require("./controllers/product");
const orderRouter = require("./controllers/order");

app.use("/", homeRouter);
app.use("/main", isSignedIn, mainRouter);
app.use("/products", isSignedIn, productRouter);
app.use("/orders", orderRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Started on port http://localhost:${PORT}`);
});
