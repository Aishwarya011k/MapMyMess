const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
// In-memory store for reset tokens (for demo; use DB in production)
const resetTokens = {};

// Reset password route
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: 'Token and new password required' });
  try {
    const email = resetTokens[token];
    if (!email) return res.status(400).json({ message: 'Invalid or expired token' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    delete resetTokens[token];
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Forgot password route
const crypto = require('crypto');
const nodemailer = require('nodemailer');

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No user with that email' });

    // Generate a reset token (in production, save to DB and expire it)
    const resetToken = crypto.randomBytes(32).toString('hex');
    resetTokens[resetToken] = email; // Store token for demo

    // Send email using nodemailer (Ethereal test account)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    let info = await transporter.sendMail({
      from: 'MapMyMess <no-reply@mapmymess.com>',
      to: email,
      subject: 'Reset your MapMyMess password',
      text: `Click the link to reset your password: ${resetUrl}`,
      html: `<p>Click the link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });
    console.log('Reset password email sent:', nodemailer.getTestMessageUrl(info));
    res.json({ message: 'Password reset link sent (check your email)', preview: nodemailer.getTestMessageUrl(info) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
