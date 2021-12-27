var __totalMarks__ = 500;

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

function add(accumulator, a) {
  return accumulator + a;
}

function getObtainedMarks() {
  var mathematicsMarks, physicsMarks, chemistryMarks, englishMarks, hindiMarks;
  mathematicsMarks = parseInt(document.getElementById('mathematicsMarks').value);
  physicsMarks = parseInt(document.getElementById('physicsMarks').value);
  chemistryMarks = parseInt(document.getElementById('chemistryMarks').value);
  englishMarks = parseInt(document.getElementById('englishMarks').value);
  hindiMarks = parseInt(document.getElementById('hindiMarks').value);

  var marksCollection = [
    mathematicsMarks,
    physicsMarks,
    chemistryMarks,
    englishMarks,
    hindiMarks
  ];

  var obtainedMarks = marksCollection.reduce(add, 0);
  return obtainedMarks;

}

function getTotalMarks() {
  var totalMarks = __totalMarks__;
  return totalMarks;
}

function getPercentage() {
  var totalMarks = getTotalMarks();
  var obtainedMarks = getObtainedMarks();
  var percentage = (obtainedMarks/totalMarks) * 100;

  return parseFloat(percentage).round(2);
}

function getFormData () {
  var studentName, mathematicsMarks, physicsMarks, chemistryMarks, englishMarks, hindiMarks, rowData;

  studentName = document.getElementById('studentName').value;
  mathematicsMarks = parseInt(document.getElementById('mathematicsMarks').value);
  physicsMarks = parseInt(document.getElementById('physicsMarks').value);
  chemistryMarks = parseInt(document.getElementById('chemistryMarks').value);
  englishMarks = parseInt(document.getElementById('englishMarks').value);
  hindiMarks = parseInt(document.getElementById('hindiMarks').value);
  percentage = getPercentage();

  rowData = [studentName, mathematicsMarks, physicsMarks, chemistryMarks, englishMarks, hindiMarks, percentage];
  return rowData;
}

function isHidden(el) {
  var style = window.getComputedStyle(el);
  return (style.display === 'none');
}

function isVisible(el) {
  return !isHidden(el);
}

function toggleEl(el) {
  if (el.style.display === "none") {
    el.style.display = "inline-block";
  } else {
    el.style.display = "none";
  }
}

function insertCells(row) {
  for (var i = 0; i < 9; i++) {
    row.insertCell(i);
  }
}

function updateCells(row, rowData) {
  for (var i = 0; i < 7; i++) {
    row.cells[i].innerHTML = rowData[i];
  }
}

function addActionLinks(row) {
  var edit = "<a class='link link-edit' onclick='handleEdit(this)'>Edit</a>";
  var del = "<a class='link link-delete' onclick='handleDelete(this)'>Delete</a>";
  row.cells[7].innerHTML = edit;
  row.cells[8].innerHTML = del;
}

function insertRow () {
  var table = document.getElementById("studentsTable");
  var tbodyRowCount = table.tBodies[0].rows.length; // 3

  var row = table.insertRow(tbodyRowCount + 1);

  insertCells(row);
  addActionLinks(row);
  return row;
}

function reset() {
  var buttonAddEl, isButtonElVisible;
  buttonAddEl = document.getElementById('buttonAdd');
  isButtonElVisible = isVisible(buttonAddEl)
  if (isButtonElVisible) {
    document.getElementById('studentName').value = "";
    document.getElementById('currentRowIndex').value = undefined;
    document.getElementById("studentName").removeAttribute("disabled");
  }
  document.getElementById('mathematicsMarks').value = "";
  document.getElementById('physicsMarks').value = "";
  document.getElementById('chemistryMarks').value = "";
  document.getElementById('englishMarks').value = "";
  document.getElementById('hindiMarks').value = "";
}

function handleValidate (rowData) {
  rowData.pop();
  var isValidate = true;
  if (rowData.includes("")) isValidate = false;
  rowData.shift();
  if (rowData.includes(null)) isValidate = false;
  if (rowData.includes(undefined)) isValidate = false;
  if (rowData.includes(NaN)) isValidate = false;
  if (rowData.min() <= 0) isValidate = false;
  if (rowData.max() >= 100) isValidate = false;
  if (!isValidate) {
    alert('all fields are required, marks should be in between of 0 to 100 and only numbers are allowed');
  }
  return isValidate;
}

function handleCreate () {
  var rowData = getFormData();
  var row = insertRow();
  // var isValidate = handleValidate(rowData);
  // if (isValidate) {
    updateCells(row, rowData);
    reset();
    alert("This record has been updated successfully");
  // }
}

function handleEdit(e) {
  row = e.parentElement.parentElement;
  rowIndex = row.rowIndex - 1;
  document.getElementById('currentRowIndex').value = rowIndex;
  document.getElementById('studentName').value = row.cells[0].innerHTML;
  document.getElementById('mathematicsMarks').value = row.cells[1].innerHTML;
  document.getElementById('physicsMarks').value = row.cells[2].innerHTML;
  document.getElementById('chemistryMarks').value = row.cells[3].innerHTML;
  document.getElementById('englishMarks').value = row.cells[4].innerHTML;
  document.getElementById('hindiMarks').value = row.cells[5].innerHTML; 

  document.getElementById("studentName").setAttribute("disabled", true);

  var buttonAdd = document.getElementById('buttonAdd');
  var butttonUpdate  = document.getElementById('butttonUpdate');
  toggleEl(buttonAdd);
  toggleEl(butttonUpdate);
}

function handleUpdate (e) {
  var rowData = getFormData();
  var isValidate = handleValidate(rowData);
  // if (isValidate) {
    var table = document.getElementById("studentsTable");
    var rowIndex = row.rowIndex - 1;
    var row = table.rows[rowIndex];
    updateCells(row, rowData);
    var buttonAdd = document.getElementById('buttonAdd');
    var butttonUpdate  = document.getElementById('butttonUpdate');
    toggleEl(buttonAdd);
    toggleEl(butttonUpdate);
    reset();
    alert("This record has been updated successfully");
  // }
}

function handleDelete(e) {
  if (confirm("Are you sure want to delete this record!")) {
    var currentRowIndex, row, rowIndex;
    currentRowIndex = parseInt(document.getElementById('currentRowIndex').value);
    row = e.parentElement.parentElement;
    rowIndex = row.rowIndex - 1;
    row.remove();
    if (currentRowIndex === 0 && currentRowIndex === rowIndex || currentRowIndex && currentRowIndex === rowIndex) {
      var buttonAdd = document.getElementById('buttonAdd');
      var butttonUpdate  = document.getElementById('butttonUpdate');
      toggleEl(buttonAdd);
      toggleEl(butttonUpdate);
      reset();
    } else {
      document.getElementById('currentRowIndex') = currentRowIndex - 1;
    }
    alert("This record has been deleted successfully");
  }
}

function handleReset () {
  reset();
}
