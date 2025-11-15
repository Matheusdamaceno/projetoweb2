const Conexao = require("./conexao");
const Logger = require("./Logger");
const { ObjectId } = require("mongodb");

class BaseDAO {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async collection() {
    const db = await Conexao.conectar();
    return db.collection(this.collectionName);
  }

  async criar(document) {
    try {
      const col = await this.collection();
      const res = await col.insertOne(document);
      Logger.info(`Inserido em ${this.collectionName}: ${res.insertedId}`);
      return res;
    } catch (err) {
      Logger.error(`Erro criar ${this.collectionName}: ${err.message}`);
      throw err;
    }
  }

  async listar(filtro = {}) {
    try {
      const col = await this.collection();
      return await col.find(filtro).toArray();
    } catch (err) {
      Logger.error(`Erro listar ${this.collectionName}: ${err.message}`);
      throw err;
    }
  }

  async atualizar(id, dados) {
    try {
      const col = await this.collection();
      const res = await col.updateOne({ _id: new ObjectId(id) }, { $set: dados });
      Logger.info(`Atualizado em ${this.collectionName}: ${id}`);
      return res;
    } catch (err) {
      Logger.error(`Erro atualizar ${this.collectionName}: ${err.message}`);
      throw err;
    }
  }

  async deletar(id) {
    try {
      const col = await this.collection();
      const res = await col.deleteOne({ _id: new ObjectId(id) });
      Logger.info(`Deletado em ${this.collectionName}: ${id}`);
      return res;
    } catch (err) {
      Logger.error(`Erro deletar ${this.collectionName}: ${err.message}`);
      throw err;
    }
  }
}

module.exports = BaseDAO;
