const fs = require("fs");

class Container {
    constructor(fileName) {
        this.fileName = fileName;
        this.products = [];
    }
    async save(product) {
        try {
            let data = await fs.promises.readFile("./files/products.txt", "utf-8");
            let products = JSON.parse(data);
            if (products.some((pro) => pro.title === product.title)) {
                return {
                    status: "error",
                    message: "El Producto ya Existe"
                };
            } else {
                let dataObj = {
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    id: products.length + 1
                };
                products = [...products, dataObj];

                try {
                    await fs.promises.writeFile(
                        "./files/products.txt",
                        JSON.stringify(products, null, 2)
                    );
                    return {
                        status: "success",
                        message: "Producto Almacenado Exitosamente"
                    };
                } catch (error) {
                    return {
                        status: "error",
                        message: "No se Almaceno el Producto"
                    };
                }
            }
        } catch (error) {   //Cuando no Existe el Archivo "products.txt"
            let dataObj = {
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                id: 1
            };

            try {
                await fs.promises.writeFile(
                    "./files/products.txt",
                    JSON.stringify([dataObj], null, 2)
                );
                return {
                    status: "success",
                    message: "Se Crea el Archivo y se Guarda el Producto Exitosamente"
                };
            } catch (error) {
                return {
                    status: "error",
                    message: "No se pudo Crear el Archivo y Guardar Producto: " + error
                };
            }
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile("./files/products.txt", "utf-8");
            let products = JSON.parse(data);
            let product = products.find((product) => product.id === id);
            // let product = products.filter((product) => product.id === id);// filter devuelve array, por ello lo cambio a find que devuelve un valor como tal, en este caso un objeto
            if (products.length > 0) {
                if (product) {
                    return {
                        status: "successs",
                        payload: product
                    };
                } else {
                    return {
                        status: "error",
                        product: null,
                        message: "Producto no Encontrado"
                    };
                }
            } else {
                return {
                    status: "error",
                    product: null,
                    message: "Producto no Encontrado"
                };
            }
        } catch (error) {
            return {
                status: "error",
                message: "No se encontró el Producto" + error
            };
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile("./files/products.txt", "utf-8");
            let products = JSON.parse(data);
            console.log(products);
            return {
                status: "success",
                message: "Productos Encontrados Exitosamente",
                payload: products
            };
        } catch (error) {
            return {
                status: "error",
                message: "No se Encontrarón los Productos"
            };
        }
    }

    async deleteById(id) {
        try {// Lee el Archivo para Obtener Array de Productos y Elimina el Producto por ID
            let data = await fs.promises.readFile("./files/products.txt", "utf-8");
            let products = JSON.parse(data);
            let result = products.filter((product) => product.id !== id);
            products = result;

            //Escribe el Archivo con el Nuevo Array 
            await fs.promises.writeFile(
                "./files/products.txt",
                JSON.stringify(products, null, 2)
            );
            return {
                status: "success",
                message: "Producto Eliminado Exitosamente"
            };
        } catch (error) {
            return {
                status: "Error",
                message: "No se encontró el Producto a Eliminar" + error
            };
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile("./files/products.txt", JSON.stringify([]));
            return {
                status: "success",
                message: "Productos Eliminados Exitosamente"
            };
        } catch (error) {
            return {
                status: "error",
                message: "No se Pudieron Eliminar los Productos"
            };
        }
    }

    async getProductoRandom() {
        try {
            let data = await fs.promises.readFile("./files/products.txt", "utf-8");
            let products = JSON.parse(data);
            let randomNumber = Math.floor(Math.random() * products.length);
            console.log("RANDOM", randomNumber);
            let randomProduct = products[randomNumber];
            return {
                status: "success",
                message: "Producto encontrado",
                payload: randomProduct
            };
        } catch (error) {
            return {
                status: "error",
                message: "No se pudo encontrar el producto" + error
            };
        }
    }


    async updateProduct(id, body) {
        try {
            let data = await fs.promises.readFile("./files/products.txt", "utf-8");
            let products = JSON.parse(data);
            if (!products.some((product) => product.id === id))
                return {
                    status: "error",
                    message: "No hay productos con el id especificado"
                };

            let result = products.map((product) => {
                if (product.id === id) {
                    body = Object.assign(body);
                    body = Object.assign({ id: product.id, ...body });
                    return body;
                } else {
                    return product;
                }
            });
            try {
                await fs.promises.writeFile("./files/products.txt", JSON.stringify(result, null, 2)
                );
                return { status: "success", message: "Producto actualizado" };
            } catch {
                return { status: "error", message: "Error al actualizar producto" };
            }
        } catch (error) {
            return { status: "error", message: "Fallo al actualizar producto" }
        }
    }

}


module.exports = Container;