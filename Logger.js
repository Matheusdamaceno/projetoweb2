const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "logs.txt");

class Logger {
  static registrar(nivel, mensagem) {
    const ts = new Date().toISOString();
    const linha = `[${ts}] [${nivel.toUpperCase()}] ${mensagem}\n`;
    fs.appendFileSync(LOG_FILE, linha, { encoding: "utf8" });
    console.log(linha.trim());
  }

  static info(msg) { this.registrar("info", msg); }
  static error(msg) { this.registrar("error", msg); }
  static warn(msg) { this.registrar("warn", msg); }
}

module.exports = Logger;
