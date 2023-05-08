import express from 'express';
import ProductManager from "./components/ProductManager.js"

const app=express()
app.use(express.urlencoded({extended: true}));
const products = new ProductManager();
const readProducts= products.readProducts()

//aqui me muestra por navegador la cantidad de productos que quiero ver a traves del limit
// http://localhost:8080/products/?limit=2
app.get( "/products", async(req,res)=>{
    //creo el limite que le paso a traves de query por navegador
    let limit=parseInt(req.query.limit);
    //si no se pasa un limite, entonces me devuelve todos los productos
    if(!limit)return res.send(await readProducts)
    //en caso de que si se pase un limit entonces me devuelve el producto indicado
    let allProduct=await readProducts
    let productLimit=allProduct.slice(0, limit)
    console.log(limit)
    res.send(productLimit)
});

// aqui le paso un id de un producto como parametro y me muestra en el navegador dicho producto
//http://localhost:8080/products/2
app.get( "/products/:id", async(req,res)=>{
    let id=parseInt(req.params.id);
    let allProduct=await readProducts
    let ProductsById= allProduct.find(product=>product.id===id)
    res.send(ProductsById)
})



//INICIO AL SERVIDOR
const PORT=8080;
const server= app.listen(PORT,()=>{
    console.log(`express por localhost ${server.address().port}`)
})
server.on("error", (error)=>console.log(`error del servidor ${error}`))
