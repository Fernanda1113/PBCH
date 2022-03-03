const express = require("express");
const router = express.Router();

const Container = require("../documents/container");
const container = new Container();

const {
    updateProduct,
  } = require("../documents/container");


//GETS
router.get("/", (req, res) => {
    console.log(req.query);
    const status = req.query;
    
    container.getAll().then((result) => {
        if (result.status === "success") {
            res.status(200).send(result.payload);
        } else {
            res.status(500).send(result.message);
        }
    });
});

router.get("/:pid", (req, res) => {
    let id = parseInt(req.params.pid);
    container.getById(id).then((result) => {
        console.log(result);
        res.send(result);
    });
});

//POSTS
router.post("/", (req, res) => {
    let body = req.body;
    body.price = parseInt(body.price);
    container.save(body).then((result) => {
        res.send(result);
    });
});

//PUTS
router.put("/:pid", (req, res) => {
    let id = parseInt(req.params.pid);
    let body = req.body;
    container.updateProduct(id, body).then((result) => {
        res.send(result);
    });
});


//DELETES
router.delete("/:pid", (req, res) => {
    let id = parseInt(req.params.pid);
    container.deleteById(id).then((result) => {
        res.send(result);
    });
});

module.exports = router;