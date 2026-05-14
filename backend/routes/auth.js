const express = require('express');
const jwt = require('jsonwebtoken');
const {
  findUserByEmail,
  findUserByReferralCode,
  createUser,
  getUserById,
  updateUser,
  incrementUserCreditsById,
} = require('../services/users');
const { protect } = require('../middleware/auth');

const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let referredBy = null;
    let credits = 3;
    if (referralCode) {
      const referrer = await findUserByReferralCode(referralCode);
      if (referrer) {
        referredBy = referralCode;
        await incrementUserCreditsById(referrer._id, 2);
        credits = 5;
      }
    }

    const user = await createUser({ name, email, password, referredBy, credits });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      referralCode: user.referralCode,
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(400).json({ message: 'User already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      referralCode: user.referralCode,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/profile', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    credits: req.user.credits,
    referralCode: req.user.referralCode,
  });
});

router.put('/profile', protect, async (req, res) => {
  try {
    if (String(req.user._id).startsWith('guest_')) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = await getUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await updateUser(req.user._id, {
      name: req.body.name ?? user.name,
      email: req.body.email ?? user.email,
      password: req.body.password || undefined,
    });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      credits: updatedUser.credits,
      referralCode: updatedUser.referralCode,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
