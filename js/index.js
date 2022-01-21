const form = document.querySelector('#form');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let id = localStorage.getItem('id') || 1;
const ulTasks = document.querySelector('#ul-tasks');
const taskInput = document.querySelector('#task');

const sendTaskObject = taskObject => {
  taskObject.id = id;
  id++;
  tasks.push(taskObject);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('id', id);

  taskInput.value = '';
  loadTasks();
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const taskObject = Object.create(null);
  taskObject.task = e.target.task.value;
  taskObject.status = 'pending';

  sendTaskObject(taskObject);
});

const loadTasks = () => {
  ulTasks.textContent = '';

  tasks.map(task => {
    const li = document.createElement('li');
    const spanTask = document.createElement('span');
    const spanIcon = document.createElement('span');

    spanTask.textContent = task.task;

    spanIcon.classList.add('check-icon');

    li.append(spanTask, spanIcon);
    ulTasks.append(li);
  });
}

loadTasks();