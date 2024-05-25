process.loadEnvFile();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_SERVER: process.env.MONGO_SERVER,
};
