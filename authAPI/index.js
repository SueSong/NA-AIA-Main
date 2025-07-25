const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing
const { OAuth2Client } = require('google-auth-library'); // For verifying Google tokens

const app = express();
app.use(cors());
app.use(express.json());

const secretKey = 'naaiaPwdSecret'; // Replace with a secure secret key
const googleClientId = '736588363997-hhfe654ejcvi9pv5jt0b5893b90ttv16.apps.googleusercontent.com'; // Replace with your Google Client ID
const googleClient = new OAuth2Client(googleClientId);

// Mock user database (replace with your actual database in production)
const users = [
  { id: '1', email: 'user@example.com', password: '$2b$10$X7EFzjLVUvUxXGxgRtLVVOYZOJxHNY2Kl3bZqQrPj6BFJJHzGpEu.' } // password is 'password123'
];

app.post('/auth', async (req, res) => {
  const { email, password, googleToken } = req.body;

  try {
    let userId, userEmail;

    if (googleToken) {
      // Google OpenID authentication
      const ticket = await googleClient.verifyIdToken({
        idToken: googleToken,
        audience: googleClientId,
      });
      const payload = ticket.getPayload();
      userId = payload['sub'];
      userEmail = payload['email'];
    } else if (email && password) {
      // Traditional email/password authentication
      const user = users.find(u => u.email === email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      userId = user.id;
      userEmail = user.email;
    } else {
      return res.status(400).json({ error: 'Invalid authentication method' });
    }

    // Create the payload for the JWT token
    const jwtPayload = {
      userId: userId,
      email: userEmail,
      iss:'userAPI'
    };

    // Generate a JWT token
    const token = jwt.sign(jwtPayload, secretKey, { expiresIn: '1h' });

    // Return the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));