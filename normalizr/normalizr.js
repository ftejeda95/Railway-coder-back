import { schema, normalize, denormalize } from "normalizr";
import util from 'util'
export const Normalizador = async (data) => {
  let pruebaData = {
    id: "mensaje",
    mensaje: [],
  };
  data.map((item) => {
    pruebaData.mensaje.push({
      id:item._id,
      text: item.text,
      date: item.date,
      author: {
        email: item.author.email,
        nombre: item.author.nombre,
        apellido: item.author.apellido,
        edad: item.author.edad,
        alias: item.author.alias,
        avatar: item.author.avatar,
      },
    });
  });

  const autorScheme = new schema.Entity("author", {}, { idAttribute: "email" });

  const mensajeScheme = new schema.Entity("mensaje", {
    author: autorScheme,
  });
  const mensajeTotla = new schema.Entity("mensaje", {
    mensaje: [mensajeScheme],
  });
  const dataNormalized = normalize(pruebaData, mensajeTotla);

  // function print(object) {
  //   console.log('util',util.inspect(object, false, 14, true));
  // }
  // print(dataNormalized)
  return dataNormalized;
};
