var __totalMarks__ = 500;

$(function () {
  $('#buttonAdd').on('click', function () {

    var studentName, mathematicsMarks, physicsMarks, chemistryMarks, englishMarks, hindiMarks;

    studentName = $("#studentName").val();
    mathematicsMarks = $("#mathematicsMarks").val();
    physicsMarks = $("#physicsMarks").val();
    chemistryMarks = $("#chemistryMarks").val();
    englishMarks = $("#englishMarks").val();
    hindiMarks = $("#hindiMarks").val();
    percentage = getPercentage()

    var edit = "<a class='link link-edit'>Edit</a>";
    var del = "<a class='link link-delete'>Delete</a>";

    if (studentName == "" || mathematicsMarks == "" || physicsMarks == "" || chemistryMarks == "" || englishMarks == "" || hindiMarks == "" ) {
      alert("All fields required!");
    } else {
      var table = "<tr><td>" + studentName + "</td><td>" + mathematicsMarks + "</td><td>" + physicsMarks + "</td><td>" + chemistryMarks + "</td><td>" + englishMarks + "</td><td>" + hindiMarks + "</td><td>" + percentage  + '%' + "</td><td>" + edit + "</td><td>" + del + "</td></tr>";
      $("#studentsTable").append(table);
      reset();
      alert("This record has been saved successfully");
    }

  });

  $('#butttonUpdate').on('click', function () {

    var currentRowIndex, mathematicsMarks, physicsMarks, chemistryMarks, englishMarks, hindiMarks, percentage;
    currentRowIndex = $('#currentRowIndex').val();
    mathematicsMarks = $("#mathematicsMarks").val();
    physicsMarks = $("#physicsMarks").val();
    chemistryMarks = $("#chemistryMarks").val();
    englishMarks = $("#englishMarks").val();
    hindiMarks = $("#hindiMarks").val();
    percentage = getPercentage();
    
    if (studentName == "" || mathematicsMarks == "" || physicsMarks == "" || chemistryMarks == "" || englishMarks == "" || hindiMarks == "" ) {
      alert("All fields required!");
    } else {
      $('#studentsTable tbody tr').eq(currentRowIndex).find('td').eq(1).html(mathematicsMarks);
      $('#studentsTable tbody tr').eq(currentRowIndex).find('td').eq(2).html(physicsMarks);
      $('#studentsTable tbody tr').eq(currentRowIndex).find('td').eq(3).html(chemistryMarks);
      $('#studentsTable tbody tr').eq(currentRowIndex).find('td').eq(4).html(englishMarks);
      $('#studentsTable tbody tr').eq(currentRowIndex).find('td').eq(5).html(hindiMarks);
      $('#studentsTable tbody tr').eq(currentRowIndex).find('td').eq(6).html(percentage + '%');
      
      $('#buttonAdd').show();
      $('#butttonUpdate').hide();
  
      reset();
      alert("This record has been updated successfully");
    }
  });

  $("#studentsTable").on("click", ".link-delete", function (e) {
    if (confirm("Are you sure want to delete this record!")) {
      var currentRowIndex, row, rowIndex;
      currentRowIndex = parseInt($('#currentRowIndex').val());
      row = $(this).closest('tr');
      rowIndex = row.index()
      row.remove();
      if (currentRowIndex === rowIndex) {
        $('#buttonAdd').show();
        $('#butttonUpdate').hide();
        reset();
      } else {
        $('#currentRowIndex').val(currentRowIndex - 1);
      }
      alert("This record has been deleted successfully");
    }
  });

  $('#buttonReset').on('click', function () {
    reset();
  });

  $("#studentsTable").on("click", ".link-edit", function (e) {
    var row = $(this).closest('tr');
    $('#currentRowIndex').val($(row).index());
    var td = $(row).find("td");

    $('#studentName').val($(td).eq(0).html());
    $('#mathematicsMarks').val($(td).eq(1).html());
    $('#physicsMarks').val($(td).eq(2).html());
    $('#chemistryMarks').val($(td).eq(3).html());
    $('#englishMarks').val($(td).eq(4).html());
    $('#hindiMarks').val($(td).eq(5).html());

    $("#studentName").attr('disabled', true);
    $('#buttonAdd').hide();
    $('#butttonUpdate').show();
  });
});

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

function add(accumulator, a) {
  return accumulator + a;
}

function getObtainedMarks() {
  mathematicsMarks = parseInt($("#mathematicsMarks").val());
  physicsMarks = parseInt($("#physicsMarks").val());
  chemistryMarks = parseInt($("#chemistryMarks").val());
  englishMarks = parseInt($("#englishMarks").val());
  hindiMarks = parseInt($("#hindiMarks").val());

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

function reset() {
  if ($('#buttonAdd').is(":visible")) {
    $("#studentName").val("");
    $("#studentName").attr('disabled', false);
    $("#currentRowIndex").val("");
  }
  $("#mathematicsMarks").val("");
  $("#physicsMarks").val("");
  $("#chemistryMarks").val("");
  $("#englishMarks").val("");
  $("#hindiMarks").val("");
}