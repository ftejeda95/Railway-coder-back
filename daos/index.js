let Mensaje;

switch ('mongodb') {
      case 'mongodb':
            const { default: MensajesDaosMongoDb } = await import(
                  './mensajes/MensajesDaosMongodb.js'
            );
            Mensaje = new MensajesDaosMongoDb();
                  
            await Mensaje.connect();
            break;

      default:
            break;
}
export { Mensaje };