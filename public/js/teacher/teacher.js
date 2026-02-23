function showToast(type, message) {
    if (type === 'success') {
        toastr.success(message, 'Success');
    } else {
        toastr.error(message, 'Error');
    }
}

// Grab security tokens from the <head> of your template
const csrfName = $('meta[name="csrf-name"]').attr('content');
const csrfToken = $('meta[name="csrf-token"]').attr('content');

// Add Teacher
$('#addTeacherForm').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: baseUrl + 'teacher/save',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                $('#AddNewModal').modal('hide');
                $('#addTeacherForm')[0].reset();
                showToast('success', 'Teacher added successfully!');
                setTimeout(() => {
                    location.reload();
                }, 1000); 
            } else {
                showToast('error', response.message || 'Failed to add teacher.');
            }
        },
        error: function () {
            showToast('error', 'An error occurred.');
        }
    });
});

// Fetch Teacher Data for Editing
$(document).on('click', '.edit-btn', function () {
   const teacherId = $(this).data('id'); 
   $.ajax({
    url: baseUrl + 'teacher/edit/' + teacherId,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
        if (response.data) {
            $('#editTeacherModal #name').val(response.data.name);
            $('#editTeacherModal #teacherId').val(response.data.id);
            $('#editTeacherModal #bday').val(response.data.bday);
            $('#editTeacherModal #address').val(response.data.address);
            $('#editTeacherModal').modal('show');
        } else {
            alert('Error fetching teacher data');
        }
    },
    error: function () {
        alert('Error fetching teacher data');
    }
});
});

// Update Teacher
$(document).ready(function () {
    $('#editTeacherForm').on('submit', function (e) {
        e.preventDefault(); 

        $.ajax({
            url: baseUrl + 'teacher/update',
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    $('#editTeacherModal').modal('hide');
                    showToast('success', 'Teacher updated successfully!');
                    setTimeout(() => location.reload(), 1000);
                } else {
                    alert('Error updating: ' + (response.message || 'Unknown error'));
                }
            },
            error: function (xhr) {
                alert('Error updating teacher');
                console.error(xhr.responseText);
            }
        });
    });
});

// Delete Teacher
$(document).on('click', '.deleteTeacherBtn', function () {
    const teacherId = $(this).data('id');

    if (confirm('Are you sure you want to delete this teacher?')) {
        $.ajax({
            url: baseUrl + 'teacher/delete/' + teacherId,
            method: 'POST', 
            data: {
                _method: 'DELETE',
                [csrfName]: csrfToken
            },
            success: function (response) {
                if (response.success) {
                    showToast('success', 'Teacher deleted successfully.');
                    setTimeout(() => location.reload(), 1000);
                } else {
                    alert(response.message || 'Failed to delete.');
                }
            },
            error: function () {
                alert('Something went wrong while deleting.');
            }
        });
    }
});

// Initialize DataTable
$(document).ready(function () {
    const $table = $('#example1');

    $table.DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: baseUrl + 'teacher/fetchRecords',
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        },
        columns: [
        { data: 'row_number' },
        { data: 'id', visible: false },
        { data: 'name' },
        { data: 'bday' },
        { data: 'address' },
        {
            data: null,
            orderable: false,
            searchable: false,
            render: function (data, type, row) {
                return `
                <button class="btn btn-sm btn-warning edit-btn" data-id="${row.id}">
                <i class="far fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger deleteTeacherBtn" data-id="${row.id}">
                <i class="fas fa-trash-alt"></i>
                </button>
                `;
            }
        }
        ],
        responsive: true,
        autoWidth: false
    });
});