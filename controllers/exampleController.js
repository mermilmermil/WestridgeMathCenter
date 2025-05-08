import CalDate from '../models/CalDate.js';

export const getExamples = async (req, res) => {
  try {
    // const examples = await Example.find();
    res.render('index');
  } catch (err) {
    res.status(500).send('Server Error', err);
  }
};

export const createExample = async (req, res) => {
  try {
    const name  = req.body.name;
    const descriptor   = req.body.descriptor || 'boring';
    const newExample = new Example({ name, descriptor });
    await newExample.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const loadFellow = async (req, res) => {
  try {
    // const today = new Date()
    const today = new Date("2025-5-1")
    today.setHours(0,0,0,0)

    const min = req.query.min || today
    const max = req.query.max || new Date("4000")

    const days = await CalDate.find({ date: { $gte: min, $lt: max}});
    
    res.render('fellow', { days });
  } catch (err) {
    res.status(500).send('Server Error', err);
  }
};

export const loadDahl = async (req, res) => {
  try {
    //const examples = await Example.find();
    res.render('msDahl');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const loadStudent = async (req, res) => {
  try {
    const days = await CalDate.find()
    res.render('student', { days });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const loadTeacher = async (req, res) => {
  try {
    // const today = new Date()
    const today = new Date("2025-5-1")
    today.setHours(0,0,0,0)

    const min = req.query.min || today
    const max = req.query.max || new Date("4000")

    const days = await CalDate.find({ date: { $gte: min, $lt: max}});
    res.render('teacher', { days });
  } catch (err) {
    res.status(500).send(err);
    
  }
}; 



// create csv reader for rotation days
//     create csv for next week rotation days

// create init for mongo with date and student in each day (after csv reader)

// populate days from date.now on to forever (or max days)

// create csv reader for student availability (init)
