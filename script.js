// Selektujemo elemente sa kojima ćemo raditi
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Kreiramo prazan objekat koji će sadržati zadatke
let tasks = [];

// Dodajemo event listener na dugme za dodavanje zadatka
addButton.addEventListener('click', addTask);

// Dohvatimo zadatke iz localStorage prilikom učitavanja stranice
window.addEventListener('load', getTasksFromLocalStorage);

// Funkcija za dodavanje novog zadatka
function addTask() {
  const taskText = taskInput.value;

  if (taskText.trim() === '') {
    alert('Please enter a task.'); // Dodajemo validaciju da polje za unos ne bude prazno
    return;
  }

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  tasks.push(taskText); // Dodajemo novi zadatak u niz
  saveTasksToLocalStorage(); // Čuvamo zadatke u localStorage

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

  const taskIndex = tasks.indexOf(taskText); // Pronalazimo indeks zadatka u nizu

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1); // Uklanjamo zadatak iz niza
    saveTasksToLocalStorage(); // Čuvamo ažurirane zadatke u localStorage
  }

  taskList.removeChild(taskItem);
}

// Funkcija za uređivanje zadatka
function editTask(event) {
  const taskItem = event.target.parentNode;
  const taskText = taskItem.firstChild.textContent;
  const editedTask = prompt('Edit task:', taskText);

  if (editedTask !== null && editedTask.trim() !== '') {
    taskItem.firstChild.textContent = editedTask;

    const taskIndex = tasks.indexOf(taskText); // Pronalazimo indeks zadatka u nizu

    if (taskIndex !== -1) {
      tasks[taskIndex] = editedTask; // Ažuriramo zadatak u nizu
      saveTasksToLocalStorage(); // Čuvamo ažurirane zadatke u localStorage
    }
  }
}

// Funkcija za označavanje zadatka kao završenog
function completeTask(event) {
  const taskItem = event.target.parentNode;
  taskItem.classList.toggle('completed');
}

// Funkcija za čuvanje zadatka u localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funkcija za dohvat svih zadatka iz localStorage
function getTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);

    tasks.forEach(task => {
      const taskItem = createTaskElement(task);
      taskList.appendChild(taskItem);
    });
  }
}
