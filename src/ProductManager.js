const fs = require("fs")



class ProductManager {



    constructor(path) {
        this.path = path
    }
   

    async getProducts() {
        // si request es una promesa debemos llamar a (getProducts) como una funcion asincrona utilizando "await" para esperar 

        const mostrarProductos = await request(this.path)
        return mostrarProductos
    }


    async getProductById(id) {

        const NewId=parseInt(id)

        const lectura = await request(this.path)
        const buscarPorID = lectura.find((i) => {
            
            return i.id === NewId
        })

        if (buscarPorID) {
            console.log("el producto encontrado fue:", buscarPorID)

            //Si no lo retornaba nunca lo iba a ver en la pantalla del navegador 🤦‍♂️
            return buscarPorID

        } else {
            let mensaje = "no se encontro ningun producto 😪"
            return mensaje
        }

    }

    
    
}

// para comprender el resultado de "request". El valor de request puede ser un array vacío [] si el archivo no existe, o una promesa que se resolverá con el contenido del archivo en formato JSON si el archivo existe.

const request = async (path) => {
    //si no existe retorna un array vacio
    if (!fs.existsSync(path)) {
        return []

    } else {
        // si existe, lee el archivo existente y retorna su contenido en formato JSON (parse= un objeto dentro de un array)
        try {
            const content = await fs.promises.readFile(path, 'utf-8')
            return JSON.parse(content)
        } catch (error) {
            console.log("ha ocurrido un error", error)
        }
    }
}


module.exports=ProductManager