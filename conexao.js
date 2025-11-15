const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.MONGODB_DB || "projetoweb";

class Conexao {
  static client = null;
  static db = null;

  static async conectar() {
    if (this.db) return this.db;
    if (!this.client) {
      this.client = new MongoClient(URI);
      await this.client.connect();
    }
    this.db = this.client.db(DB_NAME);
    return this.db;
  }

  static async fechar() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

module.exports = Conexao;
