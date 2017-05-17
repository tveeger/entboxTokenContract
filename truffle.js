module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",// "45.32.186.169"
      port: 8545,
      network_id: "*", // Match any network id
      gas: 4712388
    }
  }
};
