export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie CRUD API",
      version: "1.0.0",
      description: "A simple CRUD API for managing movies",
    },
  },
  apis: ["./app/modules/**/*.router.ts"],
};
