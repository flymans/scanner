const mongoose = require('mongoose');

const scanEventsSchema = new mongoose.Schema({
  qrId: { type: mongoose.Schema.Types.ObjectId, ref: 'qr_codes', required: true },
  scannedAt: { type: Date, default: Date.now },
});

const ScanEvents = mongoose.model('scan_events', scanEventsSchema);

module.exports = ScanEvents;