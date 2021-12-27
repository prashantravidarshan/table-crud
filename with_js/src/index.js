var __totalMarks__ = 500;
var __isValidate__ = true;
function getIsValidate() {
  
  return __isValidate__;
}

Number.prototype.round = function (places) {
  return +(Math.round(this + "e+" + places) + "e-" + places);
}

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

function handleInputStyle(type, target) {
  target.style.borderWidth = 2
  if (type === 'success') {
    target.style.borderStyle = 'double';
    target.style.borderColor = "green";
    target.style.backgroundColor = '#E0FFFF';
  } else if (type === 'error') {
    target.style.backgroundColor = '#ffcccb';
    target.style.borderStyle = 'ridge';
    target.style.borderColor = "red";
  }
  else {
    target.style.borderWidth = 2;
    target.style.backgroundColor = '#fff';
    target.style.borderStyle = 'inset';
    target.style.borderColor = '#000';
  }
}

function handleInputWarningText(target, inputWarningText) {
  target.nextSibling.nextSibling.innerHTML = inputWarningText;
  if (inputWarningText) {
    target.nextSibling.nextSibling.style.display = 'block';
  } else {
    target.nextSibling.nextSibling.style.display = 'none';
  }
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


function getIsValidateName(name) {
  var regex = /^[a-zA-Z ]{2,30}$/;
  return regex.test(name);
}

function getIsValidateMarks(markks) {
  var regex = /^\d*$/;
  return regex.test(markks);
}

function getIsLessThenZero(number) {
  return number < 0;
}

function getIsGreaterThenHundred(number) {
  return number > 100;
}

function handleValidate(target, _type) {
  // __isValidate__ = true;
  var inputWarningText = [];
  var emptyFieldText = 'This Field is required';
  var inputValue = target.value.trim();
  if (!inputValue) {
    inputWarningText.push(emptyFieldText);
    handleInputStyle('error', target);
    __isValidate__ = false;
  } else {
    removeItemOnce(inputWarningText, emptyFieldText);
    handleInputStyle('success', target);

    if (_type === 'name') {
      var isValidateName = getIsValidateName(inputValue);
      var nonValidateNameText = 'Name is not validate';
      if (!isValidateName) {
        inputWarningText.push(nonValidateNameText);
        handleInputStyle('error', target);
        __isValidate__ = false;
      } else {
        removeItemOnce(inputWarningText, nonValidateNameText);
        handleInputStyle('success', target);
      }
    }

    if (_type === 'marks') {
      var isValidateMarks = getIsValidateMarks(parseInt(inputValue));
      var nonValidateMarksText = 'Marks should only have number';
      if (!isValidateMarks) {
        inputWarningText.push(nonValidateMarksText);
        handleInputStyle('error', target);
        __isValidate__ = false;
      } else {
        removeItemOnce(inputWarningText, nonValidateMarksText);
        handleInputStyle('success', target);

        var isLessThenZero = getIsLessThenZero(parseInt(inputValue));
        var greaterThanZeroText = 'Marks should be greater then or equal to zero';
        if (isLessThenZero) {
          inputWarningText.push(greaterThanZeroText);
          handleInputStyle('error', target);
          __isValidate__ = false;
        } else {
          removeItemOnce(inputWarningText, greaterThanZeroText);
          handleInputStyle('success', target);
        }

        var isGreaterThenHundred = getIsGreaterThenHundred(parseInt(inputValue));
        var greaterThenHundredText = 'Marks should be less then or equal to hundred';
        if (isGreaterThenHundred) {
          inputWarningText.push(greaterThenHundredText);
          handleInputStyle('error', target);
          __isValidate__ = false;
        } else {
          removeItemOnce(inputWarningText, greaterThenHundredText);
        }

      }

    }
  }

  handleInputWarningText(target, inputWarningText.join('<br />'));
}

function handleName(target) {
  var _type = 'name';
  handleValidate(target, _type);
}

function handleMarks(target) {
  var _type = 'marks';
  handleValidate(target, _type);
}

function handleChange(target) {
  var inputName = target.name;
  if (inputName === "studentName") {
    handleName(target);
  } else {
    handleMarks(target);
  }
}

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
  var percentage = (obtainedMarks / totalMarks) * 100;

  return parseFloat(percentage).round(2);
}

function getFormData() {
  var studentName, mathematicsMarks, physicsMarks, chemistryMarks, englishMarks, hindiMarks, rowData;

  studentName = document.getElementById('studentName').value;
  mathematicsMarks = parseInt(document.getElementById('mathematicsMarks').value);
  physicsMarks = parseInt(document.getElementById('physicsMarks').value);
  chemistryMarks = parseInt(document.getElementById('chemistryMarks').value);
  englishMarks = parseInt(document.getElementById('englishMarks').value);
  hindiMarks = parseInt(document.getElementById('hindiMarks').value);
  percentage = getPercentage();
  var inputIds = ['studentName', 'mathematicsMarks', 'physicsMarks', 'chemistryMarks', 'englishMarks', 'hindiMarks'];
  for (var i = 0; i < inputIds.length; i++) {
    var inputEl = document.getElementById(inputIds[i]);
    handleChange(inputEl);
  }

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

function insertRow() {
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

  var inputIds = ['studentName', 'mathematicsMarks', 'physicsMarks', 'chemistryMarks', 'englishMarks', 'hindiMarks'];
  for (var i = 0; i < inputIds.length; i++) {
    var inputEl = document.getElementById(inputIds[i]);
    handleInputStyle('none', inputEl);
    handleInputWarningText(inputEl, '');
  }
  __isValidate__ = true;
}


function handleCreate() {
  var rowData = getFormData();
  var isValidate = getIsValidate();
  if (isValidate) {
    var row = insertRow();
    updateCells(row, rowData);
    reset();
    alert("This record has been updated successfully");
  } else {
    alert("Validation Failed");
    __isValidate__ = true;
  }
}

function handleEdit(e) {
  reset();
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
  var butttonUpdate = document.getElementById('butttonUpdate');
  toggleEl(buttonAdd);
  toggleEl(butttonUpdate);
}

function handleUpdate(e) {
  var currentRowIndex;
  currentRowIndex = parseInt(document.getElementById('currentRowIndex').value);
  var rowData = getFormData();
  var isValidate = getIsValidate();
  if (isValidate) {
    var table = document.getElementById("studentsTable");
    var row = table.rows[currentRowIndex + 1];
    updateCells(row, rowData);
    var buttonAdd = document.getElementById('buttonAdd');
    var butttonUpdate = document.getElementById('butttonUpdate');
    toggleEl(buttonAdd);
    toggleEl(butttonUpdate);
    reset();
    alert("This record has been updated successfully");
  } else {
    alert("Validation Failed");
    __isValidate__ = true;
  }
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
      var butttonUpdate = document.getElementById('butttonUpdate');
      toggleEl(buttonAdd);
      toggleEl(butttonUpdate);
      reset();
    } else {
      document.getElementById('currentRowIndex') = currentRowIndex - 1;
      __isValidate__ = true;
    }
    alert("This record has been deleted successfully");
  }
}

function handleReset() {
  reset();
}
