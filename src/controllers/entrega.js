//import { promises as fs } from "fs";
const fs = require("fs").promises;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    static id = 0

    addProduct = async (code, title, description, price, thumbnail, stock) => {
        ProductManager.id++;
        let newProduct = {
            code,
            title,
            description,
            price,
            thumbnail,
            stock,
            id: ProductManager.id
        };
        this.products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    getProducts = async () => {
        let result = await fs.readFile(this.path, "utf-8");
        return result; 
        //console.log(JSON.parse(result));
    }

    getProductsById = async (id) => {
        let result = await this.readProducts();
        const product = result.find((p) => p.id === id);
        if (!product) {
            console.log("Product not found");
        } else {
            console.log(product);
            return product
        }
    }

    readProducts = async () => {
        let result = await fs.readFile(this.path, "utf-8");
        return JSON.parse(result);
    }

    deleteProductById = async (id) => {
        let result = await this.readProducts();
        let filter = result.filter((product) => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(filter,null, 2));
    }
    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductById(id)
        let product = await this.readProducts()
        let productUp = [{id, ...producto}, ...product]
        await fs.writeFile(this.path, JSON.stringify(productUp, null, 2))
    }
}

//const pm = new ProductManager();

const p1 = {
    code: "product1",
    title: "Product 1",
    description: "Descripción del Producto 1",
    price: 30.00,
    thumbnail: "producto1.jpg",
    stock: 100
};
const p2 = {
    code: "product2",
    title: "Product 2",
    description: "Descripción del Producto 2",
    price: 50.00,
    thumbnail: "producto2.jpg",
    stock: 200
};


//await pm.addProduct(p1.code, p1.title, p1.description, p1.price, p1.thumbnail, p1.stock);
//await pm.addProduct(p2.code, p2.title, p2.description, p2.price, p2.thumbnail, p2.stock);

const updatedProduct = {
    id: 1,
    code: "updated Code",
    title: "Updated Title",
    description: "Updated Description",
    price: 40.00,
    thumbnail: "updatedThumbnail.jpg",
    stock: 150
}

// Testear los metodos

//await pm.getProductsById(1)
//await pm.deleteProductById(1)
//await pm.updateProducts(updatedProduct)

module.exports = ProductManager;