/**
 * ============================================================
 *  server.js — Portfolio Contact Form Backend
 *  Node.js + Express
 * ============================================================
 *  SETUP:
 *    1. npm install express cors nodemailer dotenv
 *    2. cp .env.example .env  (fill in your values)
 *    3. node server.js
 *
 *  Endpoints:
 *    POST /api/contact       — receive & save form submissions
 *    GET  /api/submissions   — view saved submissions (token protected)
 * ============================================================
 */

const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');
const path       = require('path');
const fs         = require('fs');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());

// Serve the portfolio frontend from a /public folder
app.use(express.static(path.join(__dirname, 'public')));

// ── Rate Limiter (no extra package needed) ────────────────
const ipMap = new Map();

function rateLimit(req, res, next) {
  const ip     = req.ip;
  const now    = Date.now();
  const WINDOW = 60_000; // 1 minute
  const LIMIT  = 5;      // max submissions per minute per IP

  if (!ipMap.has(ip)) ipMap.set(ip, []);
  const hits = ipMap.get(ip).filter(t => now - t < WINDOW);
  hits.push(now);
  ipMap.set(ip, hits);

  if (hits.length > LIMIT) {
    return res.status(429).json({ message: 'Too many requests — please wait a minute.' });
  }
  next();
}

// ── Email Transporter (optional) ─────────────────────────
let transporter = null;

if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Use a Gmail App Password
    },
  });
}

// ── Local JSON Storage ────────────────────────────────────
const DB_FILE = path.join(__dirname, 'submissions.json');

function saveSubmission(data) {
  let submissions = [];
  if (fs.existsSync(DB_FILE)) {
    try { submissions = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch (_) {}
  }
  submissions.push({ id: Date.now(), ...data });
  fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
}

// ── Validation ────────────────────────────────────────────
function validate({ name, email, message }) {
  if (!name    || name.trim().length < 2)              return 'Name must be at least 2 characters.';
  if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please provide a valid email.';
  if (!message || message.trim().length < 10)          return 'Message must be at least 10 characters.';
  return null;
}

// ── POST /api/contact ─────────────────────────────────────
app.post('/api/contact', rateLimit, async (req, res) => {
  const { name, email, subject, message, timestamp } = req.body;

  const error = validate({ name, email, message });
  if (error) return res.status(400).json({ message: error });

  const submission = {
    name:      name.trim(),
    email:     email.trim().toLowerCase(),
    subject:   subject || 'General',
    message:   message.trim(),
    timestamp: timestamp || new Date().toISOString(),
    ip:        req.ip,
  };

  // 1. Save to file
  try { saveSubmission(submission); }
  catch (e) { console.error('Save error:', e.message); }

  // 2. Send email notification (if configured)
  if (transporter && process.env.NOTIFY_EMAIL) {
    try {
      await transporter.sendMail({
        from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to:      process.env.NOTIFY_EMAIL,
        subject: `[Portfolio] New message from ${submission.name} — ${submission.subject}`,
        html: `
          <h2 style="font-family:sans-serif;color:#00f5a0">New Contact Submission</h2>
          <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
            <tr><td style="padding:6px 12px;color:#888">Name</td>    <td>${submission.name}</td></tr>
            <tr><td style="padding:6px 12px;color:#888">Email</td>   <td>${submission.email}</td></tr>
            <tr><td style="padding:6px 12px;color:#888">Type</td>    <td>${submission.subject}</td></tr>
            <tr>
              <td style="padding:6px 12px;color:#888;vertical-align:top">Message</td>
              <td style="white-space:pre-wrap">${submission.message}</td>
            </tr>
            <tr><td style="padding:6px 12px;color:#888">Time</td>    <td>${submission.timestamp}</td></tr>
          </table>
        `,
      });
    } catch (e) {
      // Don't fail the request just because email failed
      console.error('Email error:', e.message);
    }
  }

  console.log(`[${new Date().toLocaleString()}] Contact from ${submission.name} <${submission.email}>`);
  res.status(200).json({ message: 'Message received!' });
});

// ── GET /api/submissions (admin) ──────────────────────────
// Pass header:  X-Admin-Token: <your ADMIN_TOKEN from .env>
app.get('/api/submissions', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (!fs.existsSync(DB_FILE)) return res.json([]);
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    res.json(data);
  } catch {
    res.status(500).json({ message: 'Could not read submissions.' });
  }
});

// ── Catch-all: SPA fallback ───────────────────────────────
app.get('/{*path}', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Server running → http://localhost:${PORT}`);
  console.log(`📁  Submissions saved to: ${DB_FILE}`);
  if (transporter) console.log(`✉️   Email notifications → ${process.env.NOTIFY_EMAIL}`);
  else             console.log(`📧  Email not configured (set SMTP_USER/SMTP_PASS in .env to enable)`);
});