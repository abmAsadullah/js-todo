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
}