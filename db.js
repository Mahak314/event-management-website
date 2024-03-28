const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/evently', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
});
const user = mongoose.model('user', userSchema);

const contactFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedback: String,
});
const ContactForm = mongoose.model('ContactForm', contactFormSchema);

const newsletterSchema = new mongoose.Schema({
  email: String,
});
const newsletter = mongoose.model('newsletter', newsletterSchema);

const eventSchema = new mongoose.Schema({
  fullName: String,
  title: String,
});
const event = mongoose.model('event', eventSchema);

module.exports = {
  user: user,
  ContactForm: ContactForm, // Export the ContactForm model
  newsletter: newsletter,
  event: event,
};