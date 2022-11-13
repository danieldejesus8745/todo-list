const form = document.getElementById('form');
let id = localStorage.getItem('id') || 1;
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const ulTasks = document.getElementById('tasks');
const description = document.getElementById('description');
const maxCharacters = document.getElementById('max-characters');

function addTask(task) {
  task.id = Number(id);
  id++;
  tasks.push(task);
  localStorage.setItem('id', id);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  form.reset();
  loadTasks();
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const task = Object.create(null);
  task.description = e.target.description.value.trim();

  addTask(task);
});

description.addEventListener('keyup', e => {
  if (e.target.value.length >= 25) {
    maxCharacters.style.display = 'block';
  } else {
    maxCharacters.style.display = 'none';
  }
});

function loadTasks() {
  ulTasks.textContent = '';

  if (tasks.length === 0) {
    const div = document.createElement('div');
    div.textContent = '- Nenhuma Tarefa Adicionada -';
    ulTasks.append(div);
  } else {
    tasks.map(task => {
      const li = document.createElement('li');
      const p = document.createElement('p');
      const span = document.createElement('span');

      p.textContent = task.description;

      span.setAttribute('onclick', `removeTask(${task.id})`);
      
      li.append(p, span);
      ulTasks.append(li);
    });
  }
}

function removeTask(id) {
  const filteredTasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  loadTasks();
}

loadTasks();