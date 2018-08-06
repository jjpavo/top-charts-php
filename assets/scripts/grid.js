$(document).ready(function() {
  // Move the label corresponding to the entry
  function moveLabel(data) {
    // Take into account the row labels to create an offset
    var fromOffset = 1 + Math.floor(data.fromIndex / 10);
    var toOffset = 1 + Math.floor(data.toIndex / 10);
    var fromIndex = data.fromIndex + fromOffset;
    var toIndex = data.toIndex + fromOffset;

    labelsGrid.move(fromIndex, toIndex);
  }

  var chartGrids = [];
  var chartParts = document.getElementsByClassName('chart-section');
  for(i = 0; i < chartParts.length; i++) {
    chartGrids[i] = new Muuri(chartParts[i], {
        dragEnabled: true, dragSortInterval: 10
      }
    ).on('move', function(data) {
      moveLabel(data)
    });
  }

  var labelsGrid = new Muuri('.labels', {
  }).on('move', function(data) {
    console.log(data);
  });


  // Problems with the grid when these are hidden by default so hide them after load.
  var entryLabels = document.getElementsByClassName("entry-label");
  var entryInputs = document.getElementsByClassName("entry-input");
  var rowLabels = document.getElementsByClassName("row-label");
  console.log(rowLabels);
  // Loop through both at same time since they should always have the same count.
  for(i = 0; i < entryLabels.length; i++) {
    entryLabels[i].style.display = "none";
    entryInputs[i].style.display = "none";
  }

  for(i = 0; i < rowLabels.length; i++) {
    rowLabels[i].style.display = "none";
  }
});
