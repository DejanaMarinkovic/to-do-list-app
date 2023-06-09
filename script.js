// Selektujemo elemente sa kojima ćemo raditi
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Dodajemo event listener na dugme za dodavanje zadatka
addButton.addEventListener('click', addTask);

// Dohvatimo zadatke iz baze podataka prilikom učitavanja stranice
window.addEventListener('load', getTasks);

// Funkcija za dodavanje novog zadatka
function addTask() {
  const taskText = taskInput.value;

  if (taskText.trim() === '') {
    alert('Please enter a task.'); // Dodajemo validaciju da polje za unos ne bude prazno
    return;
  }

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  saveTaskToDatabase(taskText); // Čuvamo zadatak u bazi podataka
  saveTaskToLocalStorage(taskText); // Čuvamo zadatak u localStorage

  taskInput.value = ''; // Resetujemo polje za unos
}

// Funkcija za kreiranje elementa zadatka
function createTaskElement(taskText) {
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', deleteTask);
  taskItem.appendChild(deleteButton);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', editTask);
  taskItem.appendChild(editButton);

  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.addEventListener('click', completeTask);
  taskItem.appendChild(completeButton);

  return taskItem;
}

// Funkcija za brisanje zadatka
function deleteTask(event) {
  const taskItem = event.target.parentNode;
  const taskText = taskItem.firstChild.textContent;

  deleteTaskFromDatabase(taskText); // Poziv funkcije za brisanje iz baze podataka

  taskList.removeChild(taskItem);

  removeTaskFromLocalStorage(taskText); // Uklonite zadatak iz localStorage
}

// Funkcija za uređivanje zadatka
function editTask(event) {
  const taskItem = event.target.parentNode;
  const taskText = taskItem.firstChild.textContent;
  const editedTask = prompt('Edit task:', taskText);

  if (editedTask !== null && editedTask.trim() !== '') {
    taskItem.firstChild.textContent = editedTask;
    updateTaskInDatabase(taskText, editedTask); // Ažuriramo zadatak u bazi podataka
  }
}

// Funkcija za označavanje zadatka kao završenog
function completeTask(event) {
  const taskItem = event.target.parentNode;
  taskItem.classList.toggle('completed');
}

// Funkcija za čuvanje zadatka u bazi podataka
function saveTaskToDatabase(taskText) {
  fetch('/add_task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task: taskText })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

// Funkcija za ažuriranje zadatka u bazi podataka
function updateTaskInDatabase(oldTaskText, newTaskText) {
  fetch('/update_task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ oldTask: oldTaskText, newTask: newTaskText })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

// Funkcija za uklanjanje zadatka iz localStorage
function removeTaskFromLocalStorage(taskText) {
  let tasks = localStorage.getItem('tasks');

  if (tasks) {
    tasks = JSON.parse(tasks);

    // Pronađite indeks zadatka u nizu
    const taskIndex = tasks.indexOf(taskText);

    // Uklonite zadati zadatak iz niza
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
}

// Funkcija za brisanje zadatka iz baze podataka
function deleteTaskFromDatabase(taskText) {
  fetch('/delete_task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task: taskText })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

// Funkcija za čuvanje zadatka u localStorage
function saveTaskToLocalStorage(taskText) {
  let tasks = localStorage.getItem('tasks');

  if (tasks) {
    tasks = JSON.parse(tasks);
  } else {
    tasks = [];
  }

  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funkcija za dohvat svih zadatka iz localStorage
function getTasks() {
  let tasks = localStorage.getItem('tasks');

  if (tasks) {
    tasks = JSON.parse(tasks);

    tasks.forEach(task => {
      const taskItem = createTaskElement(task);
      taskList.appendChild(taskItem);
    });
  }
}
