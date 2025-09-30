import mongoose from 'mongoose';

const fellowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: {
    type: Array,
    default: []
  },
  email: {
    type: String,
    required: true,
  }
});

//m = morning, l = lunch, p = afterschool
// 1m/1l/1p

// add date schema instead of student


const Fellows = mongoose.model('Fellows', fellowSchema);
export default Fellows;