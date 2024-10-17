require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const QrCodes = require('./models/qr-codes.js');
const ScanEvents = require('./models/scan-events.js');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/api/scan/register/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const qrCode = await QrCodes.findById(id);

    if (!qrCode) {
      return res.status(404).send('QR код не найден');
    }

    const newScanEvent = new ScanEvents({ qrId: id });
    await newScanEvent.save();

    res.redirect(process.env.FRONT_MAIN_PAGE);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.get('/api/scan/events', async (req, res) => {
  try {
    const events = await ScanEvents.find();

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.get('/api/qrcodes/active', async (req, res) => {
  try {
    const activeQrCode = await QrCodes.findOne({ isActive: true });

    if (!activeQrCode) {
      return res.status(404).json({ error: 'Активный QR код не найден' });
    }

    res.json({
      id: activeQrCode._id,
      value: activeQrCode.qrLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});