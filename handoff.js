//Import express
const express = require("express");

//Import cors - multer
const cors = require("cors");
const multer = require("multer");

//Iniciar
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log("Servidor escuchando en: " + PORT);
});

//Import container
const Container = require("./documents/container");
//Instanciar container
const container = new Container();

//Import router
const routerProducts = require("./router/products");


//Configurar para indicar que products pueda recibir json
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Middleware manejo de errores
app.use((err, req, res, next) => {
    console.log(err.stack);
    escape.status(500).send("Error en el servidor");
});

app.use((req, res, next) => {
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log("Petición hecha a las: " + time.toTimeString().split(" ")[0]);
    next();
});

app.get("/", (req, res) => {
    res.send(`<h1> Hola, aun intento que funcionen las cosas, gracias\n <ul> <li>GET. '/api/products'\n</li> <li>GET. '/api/products/:id'\n</li> <li>POST. '/api/products'\n
    <li>PUT. '/api/products/:id'\n</li><li>DELETE. '/api/products/:id'\n</li><li>FORMULARIO. '/form.html'\n <a href="./form.html">Ingrese al Form<a/></li></ul></h1>`);
});

//Middleware
app.use("/api/products", routerProducts);

// //Get random product
app.get("/api/productoRandom", (req, res) => {
    try {
    container.getProductoRandom().then((result) => {
        let products = result.payload;
        console.log(products);
        if (result.status === "success") {
            console.log("RESULT", result);
            res.send(result.payload);
        } else {
            res.send(res.message);
        }
    });
    } catch (error) {
        res.send(res.message);
    }
});