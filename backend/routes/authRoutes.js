const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, authorize, adminOnly } = require('../middleware/authMiddleware');

// Helper function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'vtc-secret-key', {
    expiresIn: '30d',
  });
};

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if using in-memory database
    if (global.mockDB) {
      // Check if user already exists
      const userExists = global.mockDB.users.find(u => u.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = {
        _id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role: 'user',
        createdAt: new Date()
      };

      // Save user to in-memory database
      global.mockDB.users.push(user);

      // Generate JWT token
      const token = generateToken(user._id, user.role);

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    }

    // Create user in MongoDB
    const user = await User.create({
      name,
      email,
      password,
      role: 'user' // Default role
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password' });
    }

    // Check for user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      // Check for hardcoded admin as fallback (optional, but good for safety during transition)
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const adminUser = {
          _id: '1',
          name: 'Admin',
          email: process.env.ADMIN_EMAIL,
          role: 'admin'
        };
        const token = generateToken(adminUser._id, 'admin');
        return res.status(200).json({
          _id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: 'admin',
          token,
          isAdmin: true
        });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = user.getSignedJwtToken();

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      isAdmin: user.role === 'admin'
    });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current logged in user
router.get('/me', protect, async (req, res) => {
  try {
    // Check if using in-memory database
    if (global.mockDB) {
      const user = global.mockDB.users.find(u => u._id === req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Don't return password
      const { password, ...userWithoutPassword } = user;
      return res.json({
        success: true,
        data: userWithoutPassword
      });
    }

    // MongoDB flow
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create admin user (for initial setup)
router.post('/create-admin', async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // Verify admin secret
    if (adminSecret !== (process.env.ADMIN_SECRET || 'vtc_admin_secret')) {
      return res.status(401).json({ message: 'Invalid admin secret' });
    }

    // Check if using in-memory database
    if (global.mockDB) {
      // Check if user already exists
      const userExists = global.mockDB.users.find(u => u.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new admin user
      const user = {
        _id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date()
      };

      // Save user to in-memory database
      global.mockDB.users.push(user);

      // Generate JWT token
      const token = generateToken(user._id, user.role);

      return res.status(201).json({
        success: true,
        token
      });
    }

    // Create admin user in MongoDB
    const user = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Verify admin status
router.get('/verify-admin', protect, (req, res) => {
  try {
    // Check if user is admin based on JWT token
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized as admin',
        isAdmin: false
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User is authenticated as admin',
      isAdmin: true,
      user: {
        id: req.user.id,
        role: req.user.role
      }
    });
  } catch (err) {
    console.error('Verify admin error:', err.message);
    return res.status(500).json({ message: 'Server error during admin verification' });
  }
});

module.exports = router;