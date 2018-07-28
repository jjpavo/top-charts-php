function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var img = document.getElementById(data);
  ev.target.appendChild(img.cloneNode(true));
  handleLabel(ev.target);
}

// Needed since handleLabel needs to be defined after the document is ready, but
// also needs to be defined before, for the drag&drop
function handleLabel(entry) {}

$(document).ready(function() {
  handleLabel = function(entry) {
    var input = document.getElementById(entry.id + "-input");
    input.style.display = "block";
    // If the element before the label-input pair is a the number for a new row then show it.
    // previousELementSibling twice because it goes span -> label -> input.
    if(input.previousElementSibling.previousElementSibling.tagName === "SPAN") {
      input.previousElementSibling.previousElementSibling.style.display = "block";
    }
  }

  var entryInputs = document.getElementsByClassName('entry-input');
  var entryLabels = document.getElementsByClassName('entry-label');

  for(var i in entryInputs) {
    var input = entryInputs[i];
    if(input.id !== undefined) {
      input.addEventListener("keydown", function(event) {
        if (event.repeat) { return } //debounce
        if (event.keyCode === 13) {
          // Show label with user entry and hide text input box.
          var label = document.getElementById(event.target.id.split("-")[0] + "-label");
          label.style.display = "block";

          if(event.target.value === "") {
            label.innerText = "\"empty\"";
          } else {
            label.innerText = event.target.value;
          }

          event.target.style.display = "none";
        }
      });
    }
  }

  for(var i in entryLabels) {
    var label = entryLabels[i];
    if(label.id !== undefined) {
      label.addEventListener("click", function(event) {
        // Show label with user entry and hide text input box.
        var input = document.getElementById(event.target.id.split("-")[0] + "-input");
        input.style.display = "block";
        input.value = event.target.innerText;
        event.target.style.display = "none";
      });
    }
  }

  $("body").removeClass("preload");
});
