const mongoose = require('mongoose');

const qrCodesSchema = new mongoose.Schema({
  qrLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
});

const QrCodes = mongoose.model('qr_codes', qrCodesSchema);


module.exports = QrCodes;