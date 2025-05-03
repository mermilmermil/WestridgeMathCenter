import mongoose from 'mongoose';

const dateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  timeRotation: {
    type: String,
  },
  available: [],
  absent: [],
  meeting: [{
    fellow: {type: String},
    student: {type: String},
    details: {type: String}
  }]
});

//m = morning, l = lunch, p = afterschool
// 1m/1l/1p

// add date schema instead of student


const CalDate = mongoose.model('Date', dateSchema);
export default CalDate;