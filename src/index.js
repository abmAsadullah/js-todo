import { Drag } from "./drop.js";
import './style.css';

const lst = [
  {
    index: 1,
    description: 'Complete tast',
    completed: true,
  },
  {
    index: 2,
    description: 'Go for walk',
    completed: false,
  },
  {
    index: 3,
    description: 'Lodry',
    completed: true,
  },
  {
    index: 4,
    description: 'Go for daily exercise',
    completed: false,
  },
];

const selectList = document.getElementById('listed');

function viewList() {
  for (let i = 1; i <= lst.length; i += 1) {
    for (let j = 0; j < lst.length; j += 1) {
      if (lst[j].index === i) {
        const toDoLi = document.createElement('li');
        toDoLi.className = `item ${lst[j].index}`;
        toDoLi.innerHTML = `
                  <div class="check-div">
                  <input id="input-${lst[j].index}" type="checkbox"/><textarea name="description"">${lst[j].description}</textarea></div>
                  <button draggable="true"><i class="fas fa-ellipsis-v dot-icon"></i></button>`;
        selectList.appendChild(toDoLi);
        // selectList.appendChild(document.createElement('hr'));
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', viewList);


function loadLiEvents() {
  const liElements = document.querySelectorAll(".item");
  // console.log(liElements);
  for (let i = 0; i < liElements.length; i++) {
    const drag = new Drag();
    liElements[i].addEventListener("dragstart", drag.dragStart);
    liElements[i].addEventListener("dragover", drag.dragOver);
    liElements[i].addEventListener("dragleave", drag.dragLeave);
    liElements[i].addEventListener("drop", drag.drop);
  }
}

document.addEventListener("DOMContentLoaded", loadLiEvents);