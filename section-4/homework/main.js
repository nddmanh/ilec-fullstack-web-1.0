let students = [];
let selectedStudent;

function searchById (id) {
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      return i;
    }
  }

  return -1;
}

function create (id, name, age) {
  if (searchById(id) === -1) {
    students.push({
      id: id,
      name: name,
      age: age
    });
  }
}

function search (id) {
  if (!id) return students;

  let studentIndex = searchById(id);
  if (studentIndex !== -1) {
    return [ students[studentIndex] ];
  } else {
    return [];
  }
}

function update (id, name, age) {
  let studentIndex = searchById(id);

  if (studentIndex !== -1) {
    students[studentIndex].name = name;
    students[studentIndex].age = age;
  }
}

function remove (id) {
  let studentIndex = searchById(id);

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
  }
}

function handleUpdate (id) {
  let studentIndex = searchById(id.toString());

  if (studentIndex !== -1) {
    selectedStudent = students[studentIndex];
    document.getElementById("update-form").style.display = "inline-block";
    document.getElementById("update-name").value = selectedStudent.name;
    document.getElementById("update-age").value = selectedStudent.age;
    document.getElementById("update-name").focus();
  }
}

function handleDelete (id) {
  remove(id.toString());
  printStudents(students);
  clearInputs();
}

function clearInputs() {
  let allInputs = document.getElementsByTagName("input");
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].value = "";
  }
}

function printStudents (students) {
  document.getElementById("students").innerHTML = "";

  for (let i = 0; i < students.length; i++) {
    document.getElementById("students").innerHTML += 
    `<tr>
      <th scope="row">${students[i].id}</th>
      <td>${students[i].name}</td>
      <td>${students[i].age}</td>
      <td>
        <button class="btn btn-primary" onclick="handleUpdate(${students[i].id})">Edit</button>
        <button class="btn btn-primary" onclick="handleDelete(${students[i].id})">Delete</button>
      </td>
    </tr>`;
  }
}

function main() {
  // Create
  document.getElementById("create-button").addEventListener('click', function() {
    let id = document.getElementById("create-id").value;
    let name = document.getElementById("create-name").value;
    let age = document.getElementById("create-age").value;

    create(id, name, age);
    printStudents(students);
    clearInputs();
    document.getElementById("list-container-id").classList.add("display");
    document.getElementById("list-container-id").classList.remove("opacity");
  });

  // Search
  document.getElementById("search-button").addEventListener("click", function() {
    let id = document.getElementById("search-id").value;
    let searchedResults = search(id);
    printStudents(searchedResults);
    clearInputs();
  });

  // Update
  document.getElementById("update-button").addEventListener("click", function() {
    let name = document.getElementById("update-name").value;
    let age = document.getElementById("update-age").value;
    update(selectedStudent.id, name, age);
    printStudents(students);
    clearInputs();
    document.getElementById("update-form").style.display = "none";
  })

}

main();