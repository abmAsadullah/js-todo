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
];

const selectList = document.getElementById('listed');

function viewList(){
  for (let i = 1; i <= lst.length; i += 1) {
    for (let j = 0; j < lst.length; j += 1) {
      if (lst[j].index === i) {
        const toDoLi = document.createElement('li');
        toDoLi.className = 'item';
        toDoLi.innerHTML = `
                  <div class="check-div">
                  <input id="input-${lst[j].index}" type="checkbox"/><label for="input-${lst[j].index}" >${lst[j].description}</label></div>
                  <button><i class="fas fa-ellipsis-v dot-icon"></i></button>`;
        selectList.appendChild(toDoLi);
        selectList.appendChild(document.createElement('hr'));
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', viewList);