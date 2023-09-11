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

function loadTasks() {
  ulTasks.textContent = '';

  if (tasks.length === 0) {
    const div = document.createElement('div');
    div.textContent = '- Nenhuma Tarefa Adicionada -';
    ulTasks.append(div);
  } else {
    tasks.map(task => {
      const li = document.createElement('li');
      const divRightSide = document.createElement('div');
      const divLeftSide = document.createElement('div');
      const paragraphDescription = document.createElement('p');
      const buttonDone = document.createElement('button');

      divRightSide.classList.add('right-side');
      divLeftSide.classList.add('left-side');
      buttonDone.classList.add('done-button');

      paragraphDescription.textContent = task.description;

      buttonDone.setAttribute('onclick', `removeTask(${task.id})`);

      divRightSide.append(paragraphDescription);
      divLeftSide.append(buttonDone);
      li.append(divRightSide, divLeftSide);
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