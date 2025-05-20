// models/StaffSchedule.js
const mongoose = require('mongoose');
const events   = require('../events');

const staffScheduleSchema = new mongoose.Schema({
  staffName: { type: String, required: true },
  position:  { type: String, required: true },
  shiftStart:{ type: Date,   required: true },
  shiftEnd:  { type: Date,   required: true }
}, { timestamps: true });

staffScheduleSchema.post('save',           doc => events.emit('staffSchedule:changed', { action: 'save',   doc }));
staffScheduleSchema.post('findOneAndUpdate', function(doc) {
  events.emit('staffSchedule:changed', { action: 'update', doc });
});
staffScheduleSchema.post('findOneAndDelete', function(doc) {
  events.emit('staffSchedule:changed', { action: 'delete', doc });
});

module.exports = mongoose.model('StaffSchedule', staffScheduleSchema);
