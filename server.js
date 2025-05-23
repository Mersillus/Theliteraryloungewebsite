// server.js for The Literary Lounge Website (Vercel Compatible)

const express = require('express');
const path = require('path'); // Node.js module for working with file and directory paths

const app = express();
// Vercel sets the PORT environment variable automatically.
const PORT = process.env.PORT || 3000; // Fallback for local development

// --- Middleware ---
// 1. Serve static files from the 'public' directory
//    Place your 'index.html', 'about.html', 'contact.html', '404.html',
//    and any CSS/JS/image folders inside a 'public' directory in your project root.
//    Vercel will also efficiently serve files from 'public' at the edge.
app.use(express.static(path.join(__dirname, 'public')));

// 2. Middleware to parse JSON bodies (for potential API endpoints or AJAX requests)
app.use(express.json());

// 3. Middleware to parse URL-encoded bodies (essential for HTML form submissions)
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
// Root route: Serves index.html from the 'public' folder.
// The `express.static` middleware will typically serve `index.html` for the root path `/` automatically.
// You can also be explicit:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for About page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route for Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// New routes for additional sections
app.get('/import', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'import.html'));
});

app.get('/export', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'export.html'));
});

app.get('/save', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'save.html'));
});

app.get('/review', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'review.html'));
});

app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'feedback.html'));
});

// Example: Handling a POST request from a contact form
// Ensure your contact form in HTML has: method="POST" action="/submit-contact-form"
app.post('/submit-contact-form', (req, res) => {
  console.log('Contact form submission received:');
  console.log('Name:', req.body.name);     // Example: if your form has <input name="name">
  console.log('Email:', req.body.email);   // Example: if your form has <input name="email">
  console.log('Message:', req.body.message); // Example: if your form has <textarea name="message">

  // TODO: Implement actual form processing here:
  // 1. Validate the data (e.g., ensure email is valid, message is not empty)
  // 2. Send an email (using a service like Nodemailer with an email provider)
  // 3. Save to a database (if applicable)
  // 4. Send a meaningful response to the client

  // For now, sending a simple acknowledgment:
  res.status(200).send('Thank you for your message! We will get back to you soon.');
  // Or, redirect to a thank-you page:
  // res.redirect('/thank-you.html'); // (You'd need to create this page in 'public')
});

// New route for handling posts from the homepage text window
app.post('/submit-post', (req, res) => {
  console.log('New post received:');
  console.log('Post Content:', req.body.postContent);

  // In a real application, you would save this post to a database,
  // associate it with a user, handle timestamps, etc.
  // For this static site setup, we are only logging it to the server console.

  res.status(200).send('Your thoughts have been shared (logged on server)!');
});

// New route for handling feedback submissions (example)
app.post('/submit-feedback', (req, res) => {
  console.log('Feedback submission received:');
  console.log('Name:', req.body.name);
  console.log('Email:', req.body.email);
  console.log('Message:', req.body.message);

  // In a real application, this would typically involve saving to a database
  // or sending an email notification.

  res.status(200).send('Thank you for your feedback! It helps us improve.');
});

// --- Catch-all for 404 Not Found (Good Practice) ---
// This should be placed after all other specific routes.
// Create a '404.html' in your 'public' directory.
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// --- Basic Error Handling Middleware (Good Practice) ---
// This should be the last piece of middleware.
app.use((err, req, res, next) => {
  console.error("An error occurred:", err.stack);
  res.status(500).send('Sorry, something went wrong on our server. Please try again later.');
});

// --- Start the Server (for local development) ---
// Vercel doesn't use this `app.listen()` directly when deploying as a serverless function.
// It uses the exported 'app'. This block is for your local testing.
if (process.env.NODE_ENV !== 'production') { // `NODE_ENV` is 'production' on Vercel
  app.listen(PORT, () => {
    console.log(`Server is running locally on http://localhost:${PORT}`);
    console.log(`Serving static files from: ${path.join(__dirname, 'public')}`);
  });
}

// Export the Express app for Vercel to use as a serverless function
module.exports = app;