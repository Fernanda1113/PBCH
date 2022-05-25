let productosDao
let carritosDao
let ordenesDao
let usersDao

let contenedor = 'mongodb'
switch (contenedor) {
    case 'mongodb':
        const ProductosDaoMongoDb = require("./productos/ProductosDaoMongoDb")
        const CarritosDaoMongoDb = require("./carritos/CarritoDaoMongoDb")
        const OrdenesDaoMongoDb = require ("./ordenes/OrdenesDaoMongoDb")
        const UsersDaoMongoDb = require ("./users/UsersDaoMongoDb")

        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        ordenesDao = new OrdenesDaoMongoDb();
        usersDao = new UsersDaoMongoDb();
        break
}

exports.carritos = carritosDao;
exports.productos = productosDao;
exports.ordenes = ordenesDao;
exports.users = usersDao;