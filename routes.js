const express = require("express");
const Produto = require("./Produto");
const Cliente = require("./Cliente");
const Pedido = require("./Pedido");
const Logger = require("./Logger");

const router = express.Router();

// DAO
const produtoDAO = new Produto();
const clienteDAO = new Cliente();
const pedidoDAO = new Pedido();

router.get("/produtos", async (req, res) => {
  try {
    const produtos = await produtoDAO.listarProdutos();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/produtos", async (req, res) => {
  try {
    const result = await produtoDAO.criarProduto(req.body);
    res.status(201).json({ message: "Product created", id: result.insertedId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/clientes", async (req, res) => {
  try {
    const clientes = await clienteDAO.listarClientes();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/clientes", async (req, res) => {
  try {
    const result = await clienteDAO.criarCliente(req.body);
    res.status(201).json({ message: "Client created", id: result.insertedId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await pedidoDAO.listarPedidos();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/pedidos", async (req, res) => {
  try {
    const result = await pedidoDAO.criarPedido(req.body);
    res.status(201).json({ message: "Order created", id: result.insertedId });
  } catch (err) {
    Logger.error(`Error in order route: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;