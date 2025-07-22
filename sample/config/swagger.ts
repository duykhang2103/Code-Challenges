export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "URL Shortener API",
      version: "1.0.0",
      description: "A simple URL shortener API",
    },
  },
  apis: ["./app/modules/**/*.router.ts"],
};
