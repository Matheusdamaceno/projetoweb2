const BaseDAO = require("./BaseDAO");
const Logger = require("./Logger");

class Produto extends BaseDAO {
  constructor() {
    super("produtos");
  }

  validarCampos(prod) {
    if (!prod) throw new Error("Produto inválido");
    const required = ["nome", "preco"];
    const faltando = required.filter(r => prod[r] === undefined || prod[r] === null || prod[r] === "");
    if (faltando.length) {
      throw new Error(`Campos obrigatórios faltando: ${faltando.join(", ")}`);
    }
    if (typeof prod.preco !== "number") {
      throw new Error("Campo 'preco' deve ser número");
    }
  }

  async criarProduto(prod) {
    try {
      this.validarCampos(prod);
      const res = await this.criar(prod);
      return res;
    } catch (err) {
      Logger.error(`Produto criarProduto: ${err.message}`);
      throw err;
    }
  }

  async listarProdutos(filtro = {}) {
    return await this.listar(filtro);
  }

  async atualizarProduto(id, dados) {
    return await this.atualizar(id, dados);
  }

  async deletarProduto(id) {
    return await this.deletar(id);
  }
}

module.exports = Produto;
