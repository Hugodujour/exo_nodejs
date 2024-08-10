module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./server.js",
      instances: 3,
      exec_mode: "cluster",
      max_memory_restart: "200M",
      error_file: "./logs/error_file.log",
      out_file: "./logs/out_file.log",
      log_file: "./logs/log_file.log",
      combine_logs: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
