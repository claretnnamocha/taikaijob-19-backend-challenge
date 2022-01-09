import swaggerJsDoc, { Options } from "swagger-jsdoc";
import { port } from "./env";

const swagger: Options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Taikai Job 19 Challenge Backend API (Jobs Alerts)",
      contact: { name: "Claret Nnamocha", email: "devclareo@gmail.com" },
      servers: [{ url: `http://localhost:${port}` }],
    },
  },
  apis: ["./src/docs/*.yml"],
};

const config = swaggerJsDoc(swagger);

export { config };
