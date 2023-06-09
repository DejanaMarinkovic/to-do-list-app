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

  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;
  taskList.appendChild(taskItem);

  taskInput.value = ''; // Resetujemo polje za unos
}
