const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = 3000;

// Passport configuration
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Replace with actual user authentication logic
    if (username === 'user' && password === 'password') {
      return done(null, { id: 1, username: 'user' });
    } else {
      return done(null, false, { message: 'Invalid credentials' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Replace with actual user lookup logic
  const user = { id: 1, username: 'user' };
  done(null, user);
});

// Express session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with a secret key
  resave: false,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect-flash middleware for flash messages
app.use(flash());

// Define authentication routes
app.get('/login', (req, res) => {
  res.send('Please login');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true, // Enable flash messages for failed login attempts
  })
);

app.get('/dashboard', (req, res) => {
  res.send('Welcome to the dashboard');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
