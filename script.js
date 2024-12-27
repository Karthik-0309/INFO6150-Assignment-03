function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function() {
  return this.mytitle;
};

function addrecord() {
  var table = document.getElementById("myTable");
  var tbody = document.getElementsByTagName("tbody")[0];

  var lastStudentRow = table.lastElementChild ? table.lastElementChild.lastElementChild : null;
  var studentName = lastStudentRow?.previousElementSibling?.firstElementChild?.nextElementSibling?.innerHTML || "Student 0"; // gets the last student name

  var lastIndex = parseInt(studentName.split(" ")[1] || 0);

  var tableRow = document.createElement("tr");

  var tdCheckBoxNode = document.createElement("td");
  tdCheckBoxNode.innerHTML = '<input type="checkbox" onclick="onClickCheckBox(this)" /><br/><br/><img src="./dropdownimg.png" width="25px" onclick="tableView(this)">';

  var tableDataStudent = document.createElement("td");
  tableDataStudent.innerHTML = "Student " + (lastIndex + 1);

  var tableDataTeacher = document.createElement("td");
  tableDataTeacher.innerHTML = "Teacher " + (lastIndex + 1);

  var tableDataStatus = document.createElement("td");
  tableDataStatus.innerHTML = "Approved";

  var tableDataTerm = document.createElement("td");
  tableDataTerm.innerHTML = "Fall";

  var tableDataType = document.createElement("td");
  tableDataType.innerHTML = "TA";

  var tableDataBudget = document.createElement("td");
  tableDataBudget.innerHTML = "12344";

  var tableDataPercentage = document.createElement("td");
  tableDataPercentage.innerHTML = "100%";

  var tableDataAddnewtr = document.createElement("tr");
  tableDataAddnewtr.className = "dropDownTextArea";

  var tableDataDropdownText = document.createElement("td");
  tableDataDropdownText.colSpan = 8;
  tableDataDropdownText.innerHTML = "Advisor:" + (lastIndex + 1) + "<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br />";

  tableRow.appendChild(tdCheckBoxNode);
  tableRow.appendChild(tableDataStudent);
  tableRow.appendChild(tableDataTeacher);
  tableRow.appendChild(tableDataStatus);
  tableRow.appendChild(tableDataTerm);
  tableRow.appendChild(tableDataType);
  tableRow.appendChild(tableDataBudget);
  tableRow.appendChild(tableDataPercentage);

  tbody.appendChild(tableRow);
  tableDataAddnewtr.appendChild(tableDataDropdownText);
  tbody.appendChild(tableDataAddnewtr);

  alert(tableDataStudent.innerHTML + " Record Added Successfully");
}

function tableView(element) {
  var tbl = element.parentElement.parentElement.nextElementSibling;
  tbl.style.display = (tbl.style.display === "block") ? "none" : "block";
}

function onClickCheckBox(checkBox) {
  var table = document.getElementById("myTable");
  var selcheckboxrow = checkBox.parentElement.parentElement;
  var getTableHeadingRow = table.lastElementChild.firstChild;
  var checkedElms = table.querySelectorAll(":checked").length;

  if (checkBox.checked) {
      selcheckboxrow.style.backgroundColor = "Yellow";

      if (checkedElms === 1) {
          var deleteBtnRowHeading = document.createElement("th");
          deleteBtnRowHeading.innerHTML = "Delete";
          getTableHeadingRow.appendChild(deleteBtnRowHeading);
          var editBtnRowHeading = document.createElement("th");
          editBtnRowHeading.innerHTML = "Edit";
          getTableHeadingRow.appendChild(editBtnRowHeading);
      }

      addActionButtons(selcheckboxrow);
  } else {
      selcheckboxrow.style.backgroundColor = "White";

      removeActionButtons(selcheckboxrow);

      if (checkedElms === 0) {
          removeHeaderButtons(getTableHeadingRow);
      }
  }


  updateSubmitButtonState();
}

function updateSubmitButtonState() {
  var checkedElms = document.querySelectorAll(":checked").length;
  var submitButton = document.querySelector("#button-submit");

  if (checkedElms > 0) {
      submitButton.style.backgroundColor = "orange";
      submitButton.disabled = false;
  } else {
      submitButton.style.backgroundColor = "";
      submitButton.disabled = true;
  }
}

function addActionButtons(row) {
  var deleteButton = document.createElement("td");
  deleteButton.innerHTML = '<button type="button" onClick="onDeleteRow(this)">Delete</button>';
  row.appendChild(deleteButton);

  var editButton = document.createElement("td");
  editButton.innerHTML = '<button type="button" onClick="onEditRow(this)">Edit</button>';
  row.appendChild(editButton);
}

function removeActionButtons(row) {
  if (row.cells.length > 8) {
      row.deleteCell(-1);
      row.deleteCell(-1);
  }
}

function removeHeaderButtons(headerRow) {
  if (headerRow.cells.length > 2) {
      headerRow.deleteCell(-1);
      headerRow.deleteCell(-1);
  }
}

function onDeleteRow(deleteButtonRef) {
  var table = document.getElementById("myTable");
  var selectedRow = deleteButtonRef.parentElement.parentElement;
  var index = selectedRow.firstElementChild.nextElementSibling.innerHTML;

  if (confirm("Do you really want to delete Row " + selectedRow.rowIndex + "?")) {
      table.deleteRow(selectedRow.rowIndex);


      updateSubmitButtonState();

      if (table.querySelectorAll(":checked").length === 0) {
          removeHeaderButtons(table.lastElementChild.firstChild);
      }
      alert(index + " Record Successfully deleted");
  }
}

function onEditRow(editButtonRef) {
  var table = document.getElementById("myTable");
  var selectedRow = editButtonRef.parentElement.parentElement;

  var index = selectedRow.firstElementChild.nextElementSibling.innerHTML;


  prompt("Edit " + index + " Details:");


  removeActionButtons(selectedRow);


  var checkbox = selectedRow.firstElementChild.querySelector("input[type='checkbox']");
  if (checkbox) {
      checkbox.checked = false;
      onClickCheckBox(checkbox);
  }

  alert(index + " data updated Successfully");
}