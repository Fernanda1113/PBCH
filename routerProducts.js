const server = require("express").Router();
const Container = require("./documents/container");
const products = new Container(__dirname + "/files/products.json");

server.get("/", (req, res) => {
  let content = products.content;
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", {
    list: content,
    showList: boolean,
  });
});

server.post("/", (req, res) => {
  products.save(req.body);
  let content = products.content;
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", { list: content, showList: boolean });
});

server.put("/:id", (req, res) => {
  let obj = req.body;
  let id = Number(req.params.id);
  let content = products.update(id, obj);
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", { list: content, showList: boolean });
});

server.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  let content = products.deleteById(id);
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", { list: content, showList: boolean });
});

module.exports = server;