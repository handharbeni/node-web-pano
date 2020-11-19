module.exports = {
    apps: [
      {
        name: " Web Virtual Room PRASMUL",
        script: "index.js",
  
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        args: "Prasmul Pano",
        instances: "max",
        exec_mode: "cluster",
        autorestart: false,
        watch: false,
        max_memory_restart: "8G",
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  
    deploy: {
      production: {
        user: "node",
        host: "212.83.163.1",
        ref: "origin/master",
        repo: "git@github.com:repo.git",
        path: "/var/www/production",
        "post-deploy":
          "npm install && pm2 reload ecosystem.config.js --env production",
      },
    },
  };
  