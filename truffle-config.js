module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8444,
      network_id: "*" // Match any network id
    }
  }
};
