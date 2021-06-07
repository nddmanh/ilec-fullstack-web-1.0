let students = [];
let limit = 2;
let page = 5;

let fetchStudents = function (name) {
  let url = `http://localhost:3000/api/students?limit=${limit}&offset=${(page - 1) * limit}`;

  if (name) {
    url += `fullName=${name}`;
  }

  return axios.get(url).then(response => {
    students = response.data; // Query from database
  });
}

let searchById = function(input) {
    for (let i = 0; i < students.length; i++) {
        if (students[i]._id === input) {
            return i;
        }
    }
    return -1;
}

function handleDelete(id) {
  axios.delete(`http://localhost:3000/api/students/${id}`).then(function (response) {
    if (response.status === 200) {
      let studentIndex = searchById(id);
      students.splice(studentIndex, 1);
      printStudents(students);
    }
  });
}

function handleUpdate(id) {
    let studentIndex = searchById(id);
    selectedStudent = students[studentIndex];
    $(".update-container").css("display", "flex");
    $(".update-fname").val(selectedStudent.fullName);
    $(".update-pnum").val(selectedStudent.phoneNum);
    $(".update-cname").val(selectedStudent.className);
}

function create (fname, pnum, cname) {
  // Call API REQUEST TO CREATE NEW STUDENT
  axios.post('http://localhost:3000/api/students', {
    fullName: fname,
    phoneNum: pnum,
    className: cname
  }).then(response => {
    if (response.status === 200) {
      students.push(response.data);

      printStudents(students);
      
    }
  })
}

function update (id, fname, pnum, cname) {
    axios.put(`http://localhost:3000/api/students/${id}`, {
      fullName: fname,
      phoneNum: pnum,
      className: cname
    }).then(response => {
      if (response.status === 200) {
        let studentIndex = searchById(id);
        students[studentIndex].fullName = fname;
        students[studentIndex].phoneNum = pnum;
        students[studentIndex].className = cname;

        printStudents(students);
      }
    });
}

function clearInputs() {
    $("input").val("");
}

function printStudents (students) {
    $("#student-table").html(
    `<tr>
        <th style="width:80px" scope="col">ID</th>
        <th style="width:150px" scope="col">Full name</th>
        <th style="width:100px" scope="col">Phone number</th>
        <th style="width:70px" scope="col"> Class name</th>
        <th style="width:70px" scope="col"> Options</th>
    </tr>`);
    for (let i = 0; i < students.length; i++) {
        $("#student-table").append(
            `<tr>
                <td class="id-cell">${students[i]._id}</td>
                <td>${students[i].fullName}</td>
                <td>${students[i].phoneNum}</td>
                <td>${students[i].className}</td>
                <td class="option-cell">
                    <button type="button" class="edit-button btn btn-outline-success" onclick="handleUpdate('${students[i]._id}')">Edit</button>
                    <button type="button" class="del-button btn btn-outline-danger"  onclick="handleDelete('${students[i]._id}')">Del</button>
                </td>
            </tr>`
        )
    }
}

function printPage (page) {
  for (let i = 1; i <= page; i++) {
    $("#ul-page").append(
        `<li>
          <a href="?page=${i}"><button class="btn btn-primary" type="submit">${i}</button> </a>
        </li>`
      )
  }
}

function main() {
    fetchStudents()
    .then(function() {
      printStudents(students);
    });
    //Create
    $("#create-button").on("click", function() {
        let fname = $(".create-fname").val();
        let pnum = $(".create-pnum").val();
        let cname = $(".create-cname").val();
        if ($(".create-noti").html() !== "") {
            $(".create-noti").html("");
        }
        if(!(fname) || !(pnum) || !(cname)) {
            $(".create-noti").append("Please fill all the blanks!");
        } else {
        create(fname, pnum, cname);
        $(".create-noti").append("Create student success!")
        printStudents(students);
        clearInputs();
        }})
    //Update
    $("#update-button").on("click", function() {
        if ($(".update-noti").html() !== "") {
            $(".update-noti").html("");
        }
        let fname = $(".update-fname").val();
        let pnum = $(".update-pnum").val();
        let cname = $(".update-cname").val();
        update(selectedStudent._id,fname,pnum,cname);
        $(".update-noti").append("Update success!");
        printStudents(students);
        clearInputs();
    })
}
main();

function searchByName(event) {
  event.preventDefault();

  let name = document.getElementById("input-name").value;
  fetchStudents(name).then(function() {
    printStudents(students);
  });
}

printPage(page);