const Container = require("./documents/container");

const container = new Container();

async function test(){
    await container
    .save({
        title: "Borrador",
        price: 700,
        thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17q0SPC_jE63J0fTboUGvgVnI8EX3GxK2Sg&usqp=CAU"
    })
    .then((result) => console.log(result.message));

    await container.getById(1).then((result) => console.log(result));

    await container.getAll();

    await container.getProductoRandom().then((result) => console.log(result.payload));
}  

test();