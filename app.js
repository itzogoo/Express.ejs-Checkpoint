const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

// Custom middleware for working hours check
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue the request
  } else {
    // Out of working hours, return an error message
    res.status(403).send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Static files (CSS)
app.use(express.static('public'));

// Routes for the pages
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Apply the working hours check middleware to the routes
app.use(checkWorkingHours);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
