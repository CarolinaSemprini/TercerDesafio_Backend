import fs from "fs";

export default class ProductManager {
  constructor() {
    this.patch = './productoss.txt';
    //contendor de productos para que no se pisen
    this.containerProducts = [];
    this.id = 0;
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    this.id++;

    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.id,
    };

    ////cada vez que se cree un newproduct se va a enviar un nuevo producto a containerProducts
    this.containerProducts.push(newProduct);

    console.log(newProduct);

    //Enviando el nuevo producto que se guardo en la variable containerProduct. De esta forma se suben los dos productos y no se pisan
    await fs.promises.writeFile(
      this.patch,
      JSON.stringify(this.containerProducts)
    );
  };

  //leyendo los productos que tengo
  readProducts = async () => {
    try {
      const resp = await fs.promises.readFile(this.patch, 'utf-8');
      return JSON.parse(resp);
    } catch (error) {
      console.error('Error al leer productos:', error);
      return [];
    }
  };

  //espera que se lean los productos y luego se realiza la consulta sobre los productos que tiene el archivo
  /*getProducts = async () => {
    try {
      const respDos = await this.readProducts();
      console.log(respDos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };*/

  //// Filtro los productos por su id y me devulve el producto correspondiente a su id
  /*getProductsById = async (id) => {
    try {
      const respTres = await this.readProducts();

      const product = respTres.find((product) => product.id === id);

      if (!product) {
        console.log('Producto no encontrado');
      } else {
        console.log(product);
      }
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
    }
  };*/

  // borra los productos 
  /*deleteProductsById = async (id) => {
    try {
      const respTres = await this.readProducts();
         //FILTRO LOS PRODUCTOS QUE COINCIDAN CON EL ID
      const productsFilter = respTres.filter((product) => product.id !== id);

      await fs.promises.writeFile(
        this.patch,
        JSON.stringify(productsFilter)
      );

      console.log('Producto eliminado');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };*/

  //Actualizamos el producto
  /*updateProducts = async ({ id, ...producto }) => {
    try {
        // // se borra el producto por su id
      await this.deleteProductsById(id);
        // llamo a redproducts para ver lo productos que quedaron
      const productOld = await this.readProducts();
         // se crea un nuevo array con los productos restantes y el  producto modificado con el mismo id que se borro pero con su nueva actualización de datos
      const productsUpdate = [{ ...producto, id }, ...productOld];
        // luego todo eso lo re escribo en el archivo productos.txt
      await fs.promises.writeFile(
        this.patch,
        JSON.stringify(productsUpdate)
      );
    } catch (error) {
      console.error('Error al actualizar productos:', error);
    }
  };
}*/

//creando un nuevo producto
//const products = new ProductManager();

/*(async () => {
  try {
    await products.addProduct(
      'producto1',
      'descripcion 1',
      2000,
      'sin imagen',
      'abc123',
      5
    );

    await products.addProduct(
      'producto2',
      'descripcion 2',
      3000,
      'sin imagen',
      'abc124',
      6
    );

    await products.addProduct(
        'producto3',
        'descripcion 3',
        6000,
        'sin imagen',
        'abc125',
        7
      );
      await products.addProduct(
        'producto4',
        'descripcion 4',
        8000,
        'sin imagen',
        'abc126',
        8
      );
      await products.addProduct(
        'producto5',
        'descripcion 5',
        6000,
        'sin imagen',
        'abc127',
        9
      );
      await products.addProduct(
        'producto6',
        'descripcion 6',
        10000,
        'sin imagen',
        'abc128',
        8
      );
      await products.addProduct(
        'producto7',
        'descripcion 7',
        11000,
        'sin imagen',
        'abc129',
        9
      );
      await products.addProduct(
        'producto8',
        'descripcion 8',
        6000,
        'sin imagen',
        'abc1210',
        10
      );
      await products.addProduct(
        'producto9',
        'descripcion 9',
        12000,
        'sin imagen',
        'abc1211',
        11
      );
      await products.addProduct(
        'producto10',
        'descripcion 10',
        12000,
        'sin imagen',
        'abc1212',
        10
      );

   
    //await products.getProductsById(4);
    //await products.deleteProductsById(2);

    /*await products.updateProducts({
      title: 'producto3',
      description: 'descripcion 3',
      price: 5000,
      thumbnail: 'imagen3',
      code: 'abc125',
      stock: 7,
      id: 3,
    });*/
   } /*catch (error) {
    console.error('Error:', error);
  }
})();*/


