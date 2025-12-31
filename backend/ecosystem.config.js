module.exports = {
  apps: [
    {
      name: "good_food_backend",
      script: "server.js", // your main backend file
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5000,
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASSWORD: "",
        DB_NAME: "good_food"
      }
    }
  ]
};
