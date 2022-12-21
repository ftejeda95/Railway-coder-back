import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import dotenv from "dotenv";
dotenv.config()
class ContenedorMongoDB {
  constructor(modelName, schema) {
      this.collection = mongoose.model(modelName, schema)
  }

  async connect() {
    try {
          const URI = process.env.MONGO_URL;

          await mongoose.connect(URI);
          console.log('Conectado a la Base de datos MongoDb');
    } catch (error) {
          console.log('[connect] ContenedorMongoDb', error.message);
    }
}
  async readById(id) {
    return this.collection.findOne({_id: id})
  }

   async readAll() {
    let all = this.collection.find({}, { __v: 0 })
    return all;
  }

   async createElemt(obj) {
    const result = await this.collection.create(obj)
    return result
  }

   async updateById(elemID,modif) {
 
    return this.collection.updateOne({_id: elemID },{$set:modif})
  }

   async deleteById(id) {
    return this.collection.deleteOne({_id: id})
  }

   async deleteAll() {
    return this.collection.find({}).deleteMany({})
  }
}

export default ContenedorMongoDB


