import Example from '../models/CalDate.js';

export const getExamples = async (req, res) => {
  try {
    const examples = await Example.find();
    res.render('index', { examples });
  } catch (err) {
    res.status(500).send('Server Error');
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
    //const examples = await Example.find();
    res.render('fellow');
  } catch (err) {
    res.status(500).send('Server Error');
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
    //const examples = await Example.find();
    res.render('student');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const loadTeacher = async (req, res) => {
  try {
    //const examples = await Example.find();
    res.render('teacher');
  } catch (err) {
    res.status(500).send('Server Error');
  }
}; 


// create csv reader for rotation days
//     create csv for next week rotation days

// create init for mongo with date and student in each day (after csv reader)

// populate days from date.now on to forever (or max days)

// create csv reader for student availability (init)
