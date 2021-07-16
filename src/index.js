import Drag from './drop.js';
import Status from './status.js';
import './style.css';

const lst = [
  {
    index: 1,
    description: 'Complete tast',
    completed: false,
  },
  {
    index: 2,
    description: 'Go for walk',
    completed: false,
  },
  {
    index: 3,
    description: 'Lodry',
    completed: false,
  },
  {
    index: 4,
    description: 'Go for daily exercise',
    completed: false,
  },
];

function loadLiEvents() {
  const liElements = document.querySelectorAll('.item');
  for (let i = 0; i < liElements.length; i += 1) {
    const drag = new Drag();
    liElements[i].addEventListener('dragstart', drag.dragStart);
    liElements[i].addEventListener('dragover', drag.dragOver);
    liElements[i].addEventListener('drop', drag.drop);
  }
}

document.addEventListener('DOMContentLoaded', loadLiEvents);

function loadCheckboxes() {
  const checkboxes = document.querySelectorAll('.checks');
  for (let i = 0; i < checkboxes.length; i += 1) {
    const status = new Status();
    checkboxes[i].addEventListener('change', status.validation);
  }
}

document.addEventListener('DOMContentLoaded', loadCheckboxes);

// Make Local Storage

if (!localStorage.ToDoList) {
  document.addEventListener('DOMContentLoaded', Drag.sortList(lst));
} else {
  document.addEventListener(
    'DOMContentLoaded',
    Drag.sortList(JSON.parse(localStorage.getItem('ToDoList'))),
  );
}