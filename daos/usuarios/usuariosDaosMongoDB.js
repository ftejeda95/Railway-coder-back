import UsuariosModel from '../../model/user.js';
import ContenedorMongoDb from '../../controllers/contenedorMongoDB.js';

class UsuariosDaosMongoDb extends ContenedorMongoDb {
      constructor() {
            super(UsuariosModel);
      }
}
export default UsuariosDaosMongoDb;