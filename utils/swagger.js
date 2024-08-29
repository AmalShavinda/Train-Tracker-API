// import express from "express";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Train Tracker API",
//       version: "1.0.0",
//     },
//     components: {
//       securitySchemas: {
//         bearerAuth: {
//           type: "http",
//           schema: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//   },
//   apis: ["../routes/*.js", "../models/*.js"], // Adjust these paths if necessary
// };

// const swaggerSpec = swaggerJSDoc(options);

// function swaggerDocs(app, port) {
//   // Swagger page
//   app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//   //Docs in JSON format
//   app.get("docs.json", (req, res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.send(swaggerSpec);
//   });

//   //   log.info(`Docs available at http://localhost:${port}/docs`);
// }

// export default swaggerDocs;

import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load('./swagger.yaml'); // Adjust the path if necessary

function swaggerDocs(app, port) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDocument);
  });
}

export default swaggerDocs;

