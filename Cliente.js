const BaseDAO = require("./BaseDAO");
const Logger = require("./Logger");

class Cliente extends BaseDAO {
  constructor() { super("clientes"); }

  validarCampos(cliente) {
    const required = ["nome", "email"];
    const faltando = required.filter(r => !cliente[r]);
    if (faltando.length) throw new Error(`Campos obrigatórios faltando: ${faltando.join(", ")}`);
    if (!/^\S+@\S+\.\S+$/.test(cliente.email)) throw new Error("Email inválido");
  }

  async criarCliente(cliente) {
    try {
      this.validarCampos(cliente);
      return await this.criar(cliente);
    } catch (err) {
      Logger.error(`Cliente criarCliente: ${err.message}`);
      throw err;
    }
  }

  async listarClientes(filtro = {}) { return await this.listar(filtro); }
  async atualizarCliente(id, dados) { return await this.atualizar(id, dados); }
  async deletarCliente(id) { return await this.deletar(id); }
}

module.exports = Cliente;
