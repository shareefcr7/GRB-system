module.exports = {
  apps: [
    {
      name: "grb-backend",
      script: "./src/index.js",
      instances: "max", // Run as many instances as there are CPU cores (for best performance)
      exec_mode: "cluster", // Enables load balancing across processes
      env: {
        NODE_ENV: "production",
        PORT: 5001,
      },
      watch: false, // Don't watch for file changes in production
      max_memory_restart: "1G", // Restart if memory exceeds 1 GB
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "./logs/error.log", // PM2 error log path
      out_file: "./logs/out.log", // PM2 output log path
    },
  ],
};
