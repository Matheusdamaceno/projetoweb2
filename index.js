const express = require("express");
const Conexao = require("./conexao");
const Logger = require("./Logger");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  Logger.info(`Request received: [${req.method}] ${req.url}`);
  next();
});

app.use("/api", routes);

(async () => {
  try {
    await Conexao.conectar();
    Logger.info("MongoDB connection established successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      Logger.info(`Server started on port ${PORT}`);
    });

  } catch (err) {
    Logger.error(`Fatal error starting server: ${err.message}`);
    process.exit(1);
  }
})();

process.on("SIGINT", async () => {
  await Conexao.fechar();
  Logger.info("MongoDB connection closed. Application shutting down.");
  process.exit(0);
});