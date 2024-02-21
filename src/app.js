//Importo la clase ProductManager
const ProductManager = require("./ProductManager.js")

const express = require("express")

const app = express()

app.use(express.urlencoded({ extended: true }))


const product2 = new ProductManager("./products.json")

//ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto

app.get('/products', async (req, res) => {

  try {

    const { limit } = req.query
    const products = await product2.getProducts()

    // lo que se hace es que, si existe el parametro "limit" y no es falsy, se mostrara con el metodo slice DESDE el primer elemento de products2. HASTA el valor que se reciba por "limits"

    if (limit) {
      const limitedProduct = products.slice(0, limit)
      res.json(limitedProduct)
    } else {
      res.json(products)
    }



  } catch (error) {
    res.json({ error: 'Error al obtener los productos' })
  }
})


app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params




  if (pid) {


    const productById = await product2.getProductById(pid)

    res.json(productById)

  } else {
    res.send({ error: 'No se proporcionó un PID válido' })
  }

})



app.listen(8080, () => {
  console.log("corriendo el puerto 8080")
})