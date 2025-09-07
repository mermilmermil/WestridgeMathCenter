import mongoose from 'mongoose';

const dateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  timeRotation: {
    type: String,
  },
  available: {
    type: Array
  },
  absent: {
    type: Array
  },
  meeting: [{
    fellow: {type: String},
    student: {type: String},
    studentEmail: {type: String},
    details: {type: String}
  }],
  subjects: {
    type: Array
  },
  faculty: {
    type: String
  }

});

//m = morning, l = lunch, p = afterschool
// 1m/1l/1p

// add date schema instead of student


const CalDate = mongoose.model('CalDate', dateSchema);
export default CalDate;