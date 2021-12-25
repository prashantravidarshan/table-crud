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

    var edit = "<a class='edit link link-edit' href='JavaScript:void(0);' >Edit</a>";
    var del = "<a class='delete link link-delete' href='JavaScript:void(0);'>Delete</a>";

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

    var mathematicsMarks, physicsMarks, chemistryMarks, englishMarks, hindiMarks, percentage;

    mathematicsMarks = $("#mathematicsMarks").val();
    physicsMarks = $("#physicsMarks").val();
    chemistryMarks = $("#chemistryMarks").val();
    englishMarks = $("#englishMarks").val();
    hindiMarks = $("#hindiMarks").val();
    percentage = getPercentage();

    if (studentName == "" || mathematicsMarks == "" || physicsMarks == "" || chemistryMarks == "" || englishMarks == "" || hindiMarks == "" ) {
      alert("All fields required!");
    } else {
      $('#studentsTable tbody tr').eq($('#currentRowIndex').val()).find('td').eq(1).html(mathematicsMarks);
      $('#studentsTable tbody tr').eq($('#currentRowIndex').val()).find('td').eq(2).html(physicsMarks);
      $('#studentsTable tbody tr').eq($('#currentRowIndex').val()).find('td').eq(3).html(chemistryMarks);
      $('#studentsTable tbody tr').eq($('#currentRowIndex').val()).find('td').eq(4).html(englishMarks);
      $('#studentsTable tbody tr').eq($('#currentRowIndex').val()).find('td').eq(5).html(hindiMarks);
      $('#studentsTable tbody tr').eq($('#currentRowIndex').val()).find('td').eq(6).html(percentage + '%');
  
      $("#studentName").attr('disabled', false);
      $('#buttonAdd').show();
      $('#butttonUpdate').hide();
  
      reset();
      alert("This record has been updated successfully");
    }
  });

  $("#studentsTable").on("click", ".delete", function (e) {
    if (confirm("Are you sure want to delete this record!")) {
      $(this).closest('tr').remove();
      $('#buttonAdd').show();
      $('#butttonUpdate').hide();
      reset();
      alert("This record has been deleted successfully");
    } else {
      e.preventDefault();
    }
  });

  $('#buttonReset').on('click', function () {
    reset();
  });

  $("#studentsTable").on("click", ".edit", function (e) {
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

  return parseFloat(obtainedMarks).round(2);
}

function getTotalMarks() {
  var totalMarks = __totalMarks__;
  return totalMarks;
}

function getPercentage() {
  var totalMarks = getTotalMarks();
  var obtainedMarks = getObtainedMarks();
  var percentage = (obtainedMarks/totalMarks) * 100;
  return percentage;
}

function reset() {
  if ($('#buttonAdd').is(":visible")) {
    $("#studentName").val("");
  }
  $("#mathematicsMarks").val("");
  $("#physicsMarks").val("");
  $("#chemistryMarks").val("");
  $("#englishMarks").val("");
  $("#hindiMarks").val("");
  $("#currentRowIndex").val("");
  if ($('#buttonAdd').is(":visible")) {
    $("#studentName").attr('disabled', false);
  }
}

function rangeValidate(event, self) {
  var min=parseFloat($(self).attr('min'));
  var max=parseFloat($(self).attr('max'));
  var curr=parseFloat(event.target.value);
  if (curr > max) { $(self).val(max); var changed=true; }
  if (curr < min) { $(self).val(min); var changed=true; }
  if (changed) {
    $warning = $(self).siblings('.warning')
    $warning.text('Only ' + min + ' through ' + max + ' allowed');
    $warning.show()
    $warning.fadeOut(2500);
  }
}