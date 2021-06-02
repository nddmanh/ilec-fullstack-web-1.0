const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();

let students = [];

let data = fs.readFileSync('./students.json', 'utf8');
students = JSON.parse(data);

router.get('/students', function(req, res) {
  res.json(students);
});

router.post('/students', function(req, res) {
  checkDataEmpty();
  checkDataFalse ()

  students.push(req.body);
  updateStudentFile(students);
  res.status(200).send(req.body);
});

router.put('/students/:id', function (req, res) {
  checkDataEmpty();
  checkDataFalse();
  
  const studentId = req.params.id;
  const newStudent = req.body;

  students = students.map(function(item) {
    if (item.id === studentId) {
      return newStudent;
    }

    return item;
  });

  updateStudentFile(students);

  res.send(newStudent);
});

router.delete('/students/:id', function (req, res) {
  const studentId = req.params.id;

  students = students.filter(function(item) {
    return item.id !== studentId;
  });

  updateStudentFile(students);

  res.send({});
});

function updateStudentFile (newStudents) {
  fs.writeFileSync('./students.json', JSON.stringify(newStudents));
}

function checkIdExist (id) {
  return students.find(function(item) {
    return item.id === id;
  });
}

function isEmailValid (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isNameValid (name) {
  return name.length >= 2 && name.length <= 40;
}

function checkDataEmpty() {
  if (!req.body.id) {
      return res.status(400).send("No ID");
  }
  
  if (!req.body.name) {
      return res.status(400).send("No name");
  }
  
  if (!req.body.email) {
      return res.status(400).send("No email");
  }
}

function checkDataFalse () {
  if (checkIdExist(req.body.id)) {
    return res.status(400).send("ID existed!"); 
  }

  if (!isEmailValid(req.body.email)) {
    return res.status(400).send("Email is not valid!");
  }

  if (!isNameValid(req.body.name)) {
    return res.status(400).send("Name is not valid!");
  }
}

app.use(express.json());
app.use('/static', express.static(__dirname + '/images'));
app.use(router);

app.listen(3000, function () {
  console.log("Server listening on port 3000");
});