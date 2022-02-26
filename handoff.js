const Container = require("./documents/container");

const container = new Container();

container
.save({
    title: "Borrador",
    price: 700,
    thumbnail:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17q0SPC_jE63J0fTboUGvgVnI8EX3GxK2Sg&usqp=CAU"
})
.then((result) => console.log(result.message));

container.getById(2).then((product) => console.log(product));
container.getAll();