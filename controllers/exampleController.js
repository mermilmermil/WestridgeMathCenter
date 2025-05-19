import CalDate from '../models/CalDate.js';
import fs from 'fs'
import path from 'path'

const rotationDays = ["1","2","3","4","5","6"]

export const loadHome = async (req, res) => {
  try {
    
    res.render('index');
  } catch (err) {
    console.log(err)
    res.status(500).send( err);
  }
};

export const loadFellow = async (req, res) => {
  try {
    // const today = new Date()
    const today = new Date("2025-5-1")
    today.setHours(0,0,0,0)

    const min = req.query.min || today
    const max = req.query.max || new Date("4000")
    const rot = req.query.rotation 
    
    const days = rotationDays.includes(rot) ? await CalDate.find({ date: { $gte: min, $lt: max}, timeRotation: `${rot}-lunch`}) : await CalDate.find({ date: { $gte: min, $lt: max}});
    
    res.render('fellow', { days });
  } catch (err) {
    console.log(err)
    res.status(500).send( err);
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
    const rot = req.query.rotation 
    
    const days = rotationDays.includes(rot) ? await CalDate.find({ date: { $gte: min, $lt: max}, timeRotation: rot}) : await CalDate.find({ date: { $gte: min, $lt: max}});
    
    res.render('teacher', { days });
  } catch (err) {
    res.status(500).send(err);
    
  }
}; 

export const teacherAbsent = async (req, res) => {
  try {
    
    console.log(req.params)
    const idFellow = req.params.idFellow
    const id = idFellow
    console.log(id)

    const fellow = req.params.idName
    let day = await CalDate.findById(id)
    console.log(day)

    const availArray = day.available
    console.log(availArray)
    if (availArray.length > 0) {
      const index = availArray.indexOf(fellow)
      console.log("h" + index)
      const updatedAvail = availArray.splice(index, 1)
      
      console.log(availArray)

      
      let absentArray = day.absent
      absentArray.push(updatedAvail[0])

      console.log( absentArray)
      const updatedDay = await CalDate.updateOne(
        {_id: id},
        {$set: { available: availArray, absent: absentArray}}
      )
      
      // await updatedDay.save()
      res.redirect('/teacher')
    }
    else {
      res.send("how did you get here?")
    }
    
  } catch (err) {
    res.status(500).send(err);
    
  }
}; 

export const fellowAbsent = async (req, res) => {
  try {
    
    console.log(req.params)
    const idFellow = req.params.idFellow
    const id = idFellow
    console.log(id)

    const fellow = req.params.idName
    let day = await CalDate.findById(id)
    console.log(day)

    const availArray = day.available
    console.log(availArray)
    if (availArray.length > 0) {
      const index = availArray.indexOf(fellow)
      console.log("h" + index)
      const updatedAvail = availArray.splice(index, 1)
      
      console.log(availArray)

      
      let absentArray = day.absent
      absentArray.push(updatedAvail[0])

      console.log( absentArray)
      const updatedDay = await CalDate.updateOne(
        {_id: id},
        {$set: { available: availArray, absent: absentArray}}
      )
      
      // await updatedDay.save()
      res.redirect('/fellow')
    }
    else {
      res.send("how did you get here?")
    }
    
  } catch (err) {
    res.status(500).send(err);
    
  }
}; 

export const delAbsent = async (req, res) => {
  try {
    
    console.log(req.params)
    const idFellow = req.params.idFellow
    const id = idFellow
    console.log(id)

    const fellow = req.params.idName
    let day = await CalDate.findById(id)
    console.log(day)

    let absentArray = day.absent
    console.log(absentArray)

    const index = absentArray.indexOf(fellow)
    console.log("h" + index)
    const removedAbs = absentArray.splice(index, 1)
    console.log(removedAbs)
    
    const availArray = day.available
    availArray.push(removedAbs[0])

    console.log( absentArray)
    const updatedDay = await CalDate.updateOne(
      {_id: id},
      {$set: { available: availArray, absent: absentArray}}
    )
    
    // await updatedDay.save()
    res.redirect('/teacher')
  } catch (err) {
    res.status(500).send(err);
    
  }
}; 

const assignmentToDate = async (assignments, req, res) => {
  try {
  const result = []
  
  const filePath = path.join("./data", 'rotation-days.csv'); 
  fs.readFile(filePath, 'utf8', async (err, data) => {
    // Day,Date
    if (err) {
      res.send("Failed to read the file: \n" + err);
      
    }
    const lines = data.split('\n')
    const headers = lines[0].split(",") //in case you want to make it more efficient
    
    
    for  (let i = 1; i < lines.length; i++) {
    // { timeRotation, fellows, Subjects, Faculty  }
      
      const currLine = lines[i].split(',')
      const currDate = new Date(currLine[1])

      result.push({
        // date: currDate
        name: "s"
      })
      
    }
    return result
  
  });

  }catch(err){
    console.log(err)
    res.status(500).send(`Server Error \n ${err}`);
  }
}

export const assignmentCsvToJson = async (req, res) => {
  try {
      // Shift,Fellows,Faculty,Subjects
      // Day, Date
    const result = [] 
    const filePath = path.join("./data", 'center-assignments.csv'); 
    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        res.send("Failed to read the file: \n" + err);
        
      }
      const lines = data.split('\n')
      const headers = lines[0].split(",") //in case you want to make it more efficient
      
      
      for  (let i = 1; i < lines.length; i++) {
      // { timeRotation, fellows, Date(), Subjects, Faculty  }
        
        const currLine = lines[i].split(',')
        let fellows = currLine[1].split('"')[1].split(';')
        
        fellows = fellows.map(e => {
          
          const firstName = e.split(' ')[0]
          const lastName = e.split(' ')[1]
          return  `${lastName}, ${firstName}`
        })

        
        let currSubjects = currLine[3].split(';')
        if (currSubjects.length > 1) {
          currSubjects = currLine[3].split('"')[1].split(';')
        }

        const currObj = {
          timeRotation: currLine[0],
          fellows: fellows,
          subjects: currSubjects,
          faculty: currLine[2],


        }

        result.push(currObj)
        
        
      }
      
      const answer = await assignmentToDate(result)
      console.log(answer)
      res.send(answer)
    });

  } catch (err) {
    console.log(err)
    res.status(500).send(`Server Error \n ${err}`);
  }
};

