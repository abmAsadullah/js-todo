var dragging = null;
var targing = null;

export class Drag {
  dragStart(event) {
    var target = Drag.getLI(event.target);
    dragging = target;
    console.log("Start " + dragging.className);
    event.dataTransfer.setData("text/plain", null);
    event.dataTransfer.setDragImage(dragging, 0, 0);
  }

  dragOver(event) {
    event.preventDefault();
    var target = Drag.getLI(event.target);
    console.log("Over " + target.className);
    dragging.style.display = "none";
    var bounding = target.getBoundingClientRect();
    var offset = bounding.y + 46 - event.clientY;
    if (offset <= bounding.height / 2) {
      targing = target.nextSibling;
    } else {
      targing = target;
    }
    console.log(targing);
  }

  drop(event) {
    event.preventDefault();
    var target = Drag.getLI(event.target);
    dragging.style.display = "flex";
    console.log("Drop " + target.className);
    target.parentNode.insertBefore(dragging, targing);
  }

  static getLI(target) {
    while (
      target.nodeName.toLowerCase() != "li" &&
      target.nodeName.toLowerCase() != "body"
    ) {
      target = target.parentNode;
    }
    if (target.nodeName.toLowerCase() == "body") {
      return false;
    } else {
      return target;
    }
  }

  static viewList(lst) {
    const selectList = document.getElementById("listed");
    for (let i = 1; i <= lst.length; i += 1) {
      for (let j = 0; j < lst.length; j += 1) {
        if (lst[j].index === i) {
          const toDoLi = document.createElement("li");
          toDoLi.className = `item ${lst[j].index}`;
          toDoLi.innerHTML = `
                  <div class="check-div">
                  <input id="input-${lst[j].index}" type="checkbox"/><textarea name="description"">${lst[j].description}</textarea></div>
                  <button draggable="true"><i class="fas fa-ellipsis-v dot-icon"></i></button>`;
          selectList.appendChild(toDoLi);
        }
      }
    }
  }
}