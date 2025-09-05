import mongoose from 'mongoose';

const constantSchema = new mongoose.Schema({
  fellows: {
    type: Array,
    default: []
  },
  subjects: {
    type: Array,
    default: []
  },
  timeRotations: {
    type: Array,
    default: []
  }

});

//m = morning, l = lunch, p = afterschool
// 1m/1l/1p

// add date schema instead of student


const Constants = mongoose.model('Constants', constantSchema);
export default Constants;