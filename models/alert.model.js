const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    timestamp: Date,
    flow_id: Number,
    in_iface: String,
    event_type: String,
    src_ip: String,
    src_port: Number,
    dest_ip: String,
    dest_port: Number,
    proto: String,
    alert: {
      action: String,
      gid: Number,
      signature_id: Number,
      rev: Number,
      signature: String,
      category: String,
      severity: Number
    }
});

const Data = mongoose.model('Data', alertSchema);

module.exports = Data;
