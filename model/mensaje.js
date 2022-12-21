import mongoosse, { Schema } from 'mongoose';

const mensaje = new Schema({
      author: { type: Object, required: true },
      text: { type: String, required: true },
      date: { type: String, required: true },
});

export default mongoosse.model('messaje', mensaje);