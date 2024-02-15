// Load data on page load
loadData();
DisplayData();
let btnAction = "Insert";

// Show the modal when "Add New" button is clicked
$("#AddNew").on("click", function() {
  $("#EmployeeModal").modal("show");
});

// Handle form submission
$("#employeeForm").on("submit", function(event) {
  event.preventDefault();

  // Gather form data
  let formData = $("#employeeForm").serialize();
  formData += `&action=${btnAction}`;

  // Send AJAX request to the Node.js server
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "/registerEmployees", // Adjust the URL based on your server setup
    data: formData,
    success: function(data) {
      let status = data.status;
      let response = data.data;

      // Display success or error message using SweetAlert
      Swal.fire({
        icon: status ? 'success' : 'error',
        title: status ? 'Success' : 'Error',
        text: response
      });

      // Reset the form and close the modal on success
      if (status) {
        btnAction = "Insert";
        setTimeout(function() {
          $("#EmployeeModal").modal("hide");
          $("#employeeForm")[0].reset();
        }, 3000);

        // Reload and display updated data
        loadData();
        DisplayData();
      }
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
});

// Load and display employee data in the table
function loadData() {
  $("#EmployeesTable tbody").html('');
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "/getEmployees", // Adjust the URL based on your server setup
    data: { action: "get_employees" },
    success: function(data) {
      let status = data.status;
      let response = data.data;
      let html = "";

      if (status) {
        response.forEach(res => {
          let row = "<tr>";
          for (let prop in res) {
            row += `<td>${res[prop]}</td>`;
          }
          row += `<td><a class="btn btn-info update_info" data-update-id="${res['Id']}">Update</a>&nbsp;&nbsp;<a class="btn btn-danger delete_info" data-delete-id="${res['Id']}">Delete</a></td>`;
          row += "</tr>";

          html += row;
        });
        $("#EmployeesTable tbody").html(html);
      }
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// Fetch and populate employee data for updating
function fetchEmployeeInfo(id) {
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "/getEmployeesInfo", // Adjust the URL based on your server setup
    data: { action: "get_employees_info", id: id },
    success: function(data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        btnAction = "Update";
        $("#update_id").val(response['Id']);
        $("#name").val(response['Name']);
        $("#possition").val(response['Possition']);
        $("#phone").val(response['Phone']);
        $("#email").val(response['Email']);
        $("#location").val(response['Location']);
        $("#EmployeeModal").modal("show");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response
        });
      }
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// Delete employee data
function deleteEmployeeInfo(id) {
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "/deleteEmployeesInfo", // Adjust the URL based on your server setup
    data: { action: "delete_employees_info", id: id },
    success: function(data) {
      let status = data.status;
      let response = data.data;

      // Display success or error message using SweetAlert
      Swal.fire({
        icon: status ? 'success' : 'error',
        title: status ? 'Success' : 'Error',
        text: response
      });

      // Reload and display updated data on success
      if (status) {
        loadData();
      }
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// Event listener for updating employee data
$("#EmployeesTable").on('click', "a.update_info", function() {
  let id = $(this).data('update-id');
  fetchEmployeeInfo(id);
});

// Event listener for deleting employee data
$("#EmployeesTable").on('click', "a.delete_info", function() {
  let id = $(this).data('delete-id');

  // Confirm deletion using SweetAlert
  Swal.fire({
    title: 'Are you sure?',
    text: "If you want to delete this employee, click 'Yes'",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteEmployeeInfo(id);
    }
  });
});
