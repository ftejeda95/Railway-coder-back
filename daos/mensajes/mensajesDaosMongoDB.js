import { Schema } from 'mongoose'

import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js"

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
      console.log('ProductosDaoMongoDB Here')
        super('Mensajes', new Schema({
          author: { type: Object, required: true },
          text: { type: String, required: true },
          date: { type: String, required: true },
        }))
    }
    
}


export default ProductosDaoMongoDB