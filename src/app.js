const PUERTO = 8080;

const express = require("express");
const app = express();
const ProductManager = require("./controllers/entrega.js");
const productManager = new ProductManager("./src/models/products.json")

app.use(express.json());

//listar productos
app.get("/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit); 
        const products = await productManager.getProducts();
        const parsedProducts = JSON.parse(products);
        limit ? res.json(parsedProducts.slice(0, limit)) : res.json(parsedProducts)

    } catch (error) {
        res.status(500).json({error : "Error del servidor"})
    }
})
//buscar por id del producto
app.get("/products/:pid", async (req, res) => {
    try {
        let id = req.params.pid;
        const product = await productManager.getProductsById(parseInt(id));

        if(!product) {
            return res.json({error: "id not found"});
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})

//metodo de respuesta al iniciar el metodo o ingresar a la pagina
app.get("/", (req, res) => {
    res.send("Bienvenidos a mi e-commerce")
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

