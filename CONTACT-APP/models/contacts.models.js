import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';
const contactSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});

contactSchema.plugin(paginate)


const Contact = mongoose.model("Contact", contactSchema);



export default Contact
