const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
const tablesRoute = require("./routes/table.route.js");
const userRoute = require("./routes/user.route.js");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.1.0",
        info: {
            title: 'WALK THE ISLE API',
            description: 'API Collections for Walk The Isle',
            version: '1.0.0',
            description:
                " A collection of wondefully crafted api for the event management app",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        scheme:['http','https'],
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header',
            },
        },
    },
    apis: ['./routes/*.js'], // Path to the API routes folder
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));


// routes
app.use("/api/products", productRoute);
app.use("/api/tables", tablesRoute);
app.use("/api/user", userRoute);

mongoose
    .connect(
        "mongodb+srv://adujosephayo:W6BSYEG2iX5CJbKq@clusterwalktheisle.ysat9si.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWalkTheIsle"
    )
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch(() => {
        console.log("Connection failed!");
    });