export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Score API",
      version: "1.0.0",
      description: "API for managing user scores and leaderboard",
    },
  },
  apis: ["./app/modules/**/*.router.ts"],
};
