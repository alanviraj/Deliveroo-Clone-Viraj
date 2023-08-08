require('dotenv-defaults').config()
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

app.use(bodyparser.json());

const PORT = process.env.PORT || 5000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World warr");
});

// call sync()

const db = require("./models");
db.sequelize.sync({});
const userAPI = require("./routes/user.api");
app.use("/user", userAPI());

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Library API",
//       version: "1.0.0",
//       description: "A simple Express Library API",
//     },
//     servers: [
//       {
//         url: "https://test-intern-app-api.herokuapp.com",
//       },
//     ],
//   },
//   apis: ["./swagger.js"],
// };
// const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
