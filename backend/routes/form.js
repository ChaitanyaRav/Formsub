import express from 'express';
import Interest from '../models/interest.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const router = express.Router();

// POST /api/form/submit - handle form submission
router.post('/submit', async (req, res) => {
  try {
    const { fullName, mobile, email, city, propertyType, budget, message } = req.body;

    // Basic server-side validation (all fields mandatory)
    if (!fullName || !mobile || !email || !city || !propertyType || !budget || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Additional validation - Indian 10-digit mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ error: 'Invalid mobile number format.' });
    }

    // Validate email format
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Save form data to MongoDB
    const newEntry = new Interest({ fullName, mobile, email, city, propertyType, budget, message });
    const savedEntry = await newEntry.save();
    // ...inside your existing route after saving the form submission:
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email, // Sends email to the user who just registered (submitted the form)
  subject: 'Thank you for registering your interest',
  html: `
    <h3>Thank you for your interest, ${fullName}!</h3>
    <p>We have received your details:</p>
    <ul>
      <li><b>Full Name:</b> ${fullName}</li>
      <li><b>Mobile:</b> ${mobile}</li>
      <li><b>Email:</b> ${email}</li>
      <li><b>City:</b> ${city}</li>
      <li><b>Property Type:</b> ${propertyType}</li>
      <li><b>Budget:</b> ${budget}</li>
      <li><b>Message:</b> ${message}</li>
    </ul>
    <p>Our team will contact you soon.</p>
  `
};

try {
  await transporter.sendMail(mailOptions);
} catch (err) {
  console.error('Error sending confirmation email:', err);
}


    res.status(201).json({ success: true, entry: savedEntry });
  } catch (error) {
    console.error('Error saving form submission:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// (Optional) GET /api/form/analytics - basic analytics: counts for today, this week, and total entries
router.get('/analytics', async (req, res) => {
  try {
    const now = new Date();

    // Start of today
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Start of this week (Sunday)
    const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);

    const todayCount = await Interest.countDocuments({ createdAt: { $gte: startOfToday } });
    const weekCount = await Interest.countDocuments({ createdAt: { $gte: startOfWeek } });
    const totalCount = await Interest.countDocuments();

    res.json({
      today: todayCount,
      thisWeek: weekCount,
      total: totalCount,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
