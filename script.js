// Selektujemo elemente sa kojima ćemo raditi
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Dodajemo event listener na dugme za dodavanje zadatka
addButton.addEventListener('click', addTask);

// Funkcija za dodavanje novog zadatka
function addTask() {
  const taskText = taskInput.value;

  if (taskText.trim() === '') {
    alert('Please enter a task.'); // Dodajemo validaciju da polje za unos ne bude prazno
    return;
  }

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  taskInput.value = ''; // Resetujemo polje za unos
}

// Funkcija za kreiranje elementa zadatka
function createTaskElement(taskText) {
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    taskItem.remove();
  });

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() {
    editTask(taskItem);
  });

  const completeCheckbox = document.createElement('input');
  completeCheckbox.type = 'checkbox';
  completeCheckbox.addEventListener('change', function() {
    taskItem.classList.toggle('completed');
  });

  taskItem.appendChild(deleteButton);
  taskItem.appendChild(editButton);
  taskItem.appendChild(completeCheckbox);

  return taskItem;
}

// Funkcija za izmenu zadatka
function editTask(taskItem) {
  const taskText = taskItem.textContent;
  const newTaskText = prompt('Edit task:', taskText);

  if (newTaskText !== null) {
    taskItem.textContent = newTaskText;
  }
}
