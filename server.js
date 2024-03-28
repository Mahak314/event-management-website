const express = require('express');
const app = express();
const cors = require("cors")
const User = require('./user'); // Import the User model
const { event, ContactForm, newsletter } = require('./db');


const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/api/register', async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    // Create a new user document
    const user = new User({ name, email, pass });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, pass } = req.body;
  // Verify if a user with the provided email and password exists in the database
  const user = await User.findOne({ email, pass });

  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Login failed' });
  }
});

app.post('/api/contactus', async (req, res) => {
  const { name, email, feedback } = req.body;
  try {
    const contactFormData = new ContactForm({ name, email, feedback });
    await contactFormData.save();
    res.status(201).json({ message: 'Contact form data saved' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving contact form data' });
  }
});

app.post('/api/newslettersubscription', async (req, res) => {
  const {email} = req.body;
  try {
    const newsletterData = new newsletter({ email});
    await newsletterData.save();
    res.status(201).json({ message: 'Contact form data saved' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving contact form data' });
  }
});

app.post('/api/eventbox', async (req, res) => {
  const { fullName, eventTitle } = req.body;
  try {
    const eventdata = new event({
      fullName,
      title: eventTitle,
    });
    await eventdata.save();
    console.log('Event reservation saved:', fullName, eventTitle); // Add this log statement

    res.status(201).json({ message: 'Event reservation saved' });
  } catch (error) {
    console.error('Error saving event reservation:', error);
    res.status(500).json({ error: 'Error saving event reservation' });
  }
});
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
