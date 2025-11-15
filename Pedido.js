const BaseDAO = require("./BaseDAO");
const Logger = require("./Logger");
const { ObjectId } = require("mongodb");

class Pedido extends BaseDAO {
  constructor() { super("pedidos"); }

  validarCampos(pedido) {
    const required = ["clienteId", "itens"];
    const faltando = required.filter(r => !pedido[r]);
    if (faltando.length) throw new Error(`Campos obrigatórios faltando: ${faltando.join(", ")}`);
    if (!Array.isArray(pedido.itens) || pedido.itens.length === 0) throw new Error("Campo 'itens' deve ser array não vazio");
  }

  async criarPedido(pedido) {
    try {
      this.validarCampos(pedido);
      // converter id se for string
      pedido.clienteId = new ObjectId(pedido.clienteId);
      return await this.criar(pedido);
    } catch (err) {
      Logger.error(`Pedido criarPedido: ${err.message}`);
      throw err;
    }
  }

  async listarPedidos(filtro = {}) { return await this.listar(filtro); }
  async atualizarPedido(id, dados) { return await this.atualizar(id, dados); }
  async deletarPedido(id) { return await this.deletar(id); }
}

module.exports = Pedido;
