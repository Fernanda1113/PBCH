const express = require('express')
const fs = require('fs')

const PORT = process.env.PORT || 8080
const app = express()

class Container {
    constructor(name) {
        this.name = name
    }
}

const productsText = new Container('./files/products.txt')

app.get('/productos', (req, res) => {
    fs.readFile(productsText.name, 'utf-8', error =>{
        if(error) throw new Error(error.message)

        const arrayProducts = JSON.parse(fs.readFileSync(productsText.name))
        res.send(`
        <div>${JSON.stringify(arrayProducts)}</div>
        `)
    })
})

app.get('/productoRandom', (req, res) => {
    fs.readFile(productsText.name, 'utf-8', error =>{
        if(error) throw new Error(error.message)

        const arrayProducts = JSON.parse(fs.readFileSync(productsText.name))
        const random = Math.floor(Math.random()*arrayProducts.length);
        res.send(`${JSON.stringify(arrayProducts[random])}`)
    })
})

app.listen(PORT, () =>{
    console.log(`Servidor activo, se escucha en el puerto ${PORT}`)
    })