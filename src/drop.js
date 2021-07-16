import Status from './status.js';

let dragging = null;
let targing = null;

export default class Drag {
  dragStart(event) {
    const target = Drag.getLI(event.target);
    dragging = target;
    event.dataTransfer.setDragImage(dragging, 0, 0);
  }

  dragOver(event) {
    event.preventDefault();
    const target = Drag.getLI(event.target);
    dragging.style.display = 'none';
    const bounding = target.getBoundingClientRect();
    const offset = bounding.y + 46 - event.clientY;
    if (offset <= bounding.height / 2) {
      targing = target.nextSibling;
    } else {
      targing = target;
    }
  }

  drop(event) {
    event.preventDefault();
    const target = Drag.getLI(event.target);
    dragging.style.display = 'flex';
    target.parentNode.insertBefore(dragging, targing);
    // Local Storage change saved
    Status.saveChanges();
  }

  static getLI(target) {
    while (
      target.nodeName.toLowerCase() !== 'li'
      && target.nodeName.toLowerCase() !== 'body'
    ) {
      target = target.parentNode;
    }
    if (target.nodeName.toLowerCase() === 'body') {
      return false;
    }
    return target;
  }

  static sortList(lst) {
    const listUl = document.getElementById('listed');
    for (let i = 1; i <= lst.length; i += 1) {
      for (let j = 0; j < lst.length; j += 1) {
        if (lst[j].index === i) {
          const toDoLi = document.createElement('li');
          toDoLi.className = `item ${lst[j].index}`;
          if (lst[j].completed) {
            const checkDiv = document.createElement('div');
            checkDiv.className = 'check-div';
            toDoLi.appendChild(checkDiv);
            const checks = document.createElement('input');
            checks.className = 'checks';
            checks.type = 'checkbox';
            checks.checked = 'true';
            checkDiv.appendChild(checks);
            const descTextArea = document.createElement('textarea');
            descTextArea.name = 'description';
            descTextArea.innerText = lst[j].description;
            descTextArea.style['text-decoration'] = 'line-through';
            descTextArea.style.color = '#909090';
            checkDiv.appendChild(descTextArea);
            const dragBtn = document.createElement('button');
            dragBtn.draggable = 'true';
            const dotIcon = document.createElement('dot');
            dotIcon.className = "fas fa-ellipsis-v dot-icon";
            dragBtn.appendChild(dotIcon);
            toDoLi.appendChild(dragBtn);
          } else {
            const checkDiv = document.createElement('div');
            checkDiv.className = 'check-div';
            toDoLi.appendChild(checkDiv);
            const checks = document.createElement('input');
            checks.className = 'checks';
            checks.type = 'checkbox';
            checkDiv.appendChild(checks);
            const descTextArea = document.createElement('textarea');
            descTextArea.name = 'description';
            descTextArea.innerText = lst[j].description;
            checkDiv.appendChild(descTextArea);
            const dragBtn = document.createElement('button');
            dragBtn.draggable = 'true';
            const dotIcon = document.createElement('dot');
            dotIcon.className = "fas fa-ellipsis-v dot-icon";
            dragBtn.appendChild(dotIcon);
            toDoLi.appendChild(dragBtn);
          }
          listUl.appendChild(toDoLi);
        }
      }
    }
  }
}