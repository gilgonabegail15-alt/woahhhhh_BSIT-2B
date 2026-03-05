function showToast(type, message) {
    if (type === 'success') {
        toastr.success(message, 'Success');
    } else {
        toastr.error(message, 'Error');
    }
}

/* ===========================
   ADD PARENT
=========================== */
$('#addParentForm').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
        url: baseUrl + 'parents/save',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                $('#AddParentModal').modal('hide');
                $('#addParentForm')[0].reset();
                showToast('success', 'Parent added successfully!');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } else {
                showToast('error', response.message || 'Failed to add parent.');
            }
        },
        error: function () {
            showToast('error', 'An error occurred.');
        }
    });
});


/* ===========================
   EDIT PARENT (FETCH DATA)
=========================== */
$(document).on('click', '.editParentBtn', function () {
    const parentId = $(this).data('id');

    $.ajax({
        url: baseUrl + 'parents/edit/' + parentId,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.data) {

                $('#editParentModal #parentId').val(response.data.id);
                $('#editParentModal #name').val(response.data.name);
                $('#editParentModal #gender').val(response.data.gender);
                $('#editParentModal #address').val(response.data.address);
                

                $('#editParentModal').modal('show');

            } else {
                alert('Error fetching parent data');
            }
        },
        error: function () {
            alert('Error fetching parent data');
        }
    });
});


/* ===========================
   UPDATE PARENT
=========================== */
$(document).ready(function () {

    $('#editParentForm').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: baseUrl + 'parents/update',
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {

                if (response.success) {
                    $('#editParentModal').modal('hide');
                    showToast('success', 'Parent updated successfully!');
                    setTimeout(() => location.reload(), 1000);
                } else {
                    alert('Error updating: ' + (response.message || 'Unknown error'));
                }

            },
            error: function (xhr) {
                alert('Error updating');
                console.error(xhr.responseText);
            }
        });

    });

});


/* ===========================
   DELETE PARENT
=========================== */
$(document).on('click', '.deleteParentBtn', function () {

    const parentId = $(this).data('id');
    const csrfName = $('meta[name="csrf-name"]').attr('content');
    const csrfToken = $('meta[name="csrf-token"]').attr('content');

    if (confirm('Are you sure you want to delete this parent?')) {

        $.ajax({
            url: baseUrl + 'parents/delete/' + parentId,
            method: 'POST',
            data: {
                _method: 'DELETE',
                [csrfName]: csrfToken
            },
            success: function (response) {

                if (response.success) {
                    showToast('success', 'Parent deleted successfully.');
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


/* ===========================
   DATATABLE
=========================== */
$(document).ready(function () {

    const $table = $('#example1');

    const csrfName = 'csrf_test_name';
    const csrfToken = $('input[name="' + csrfName + '"]').val();

    $table.DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: baseUrl + 'parents/fetchRecords',
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        },
        columns: [
            { data: 'row_number' },
            { data: 'id', visible: false },
            { data: 'name' },
            { data: 'gender' },
            { data: 'address' },
        
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-sm btn-warning editParentBtn" data-id="${row.id}">
                            <i class="far fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger deleteParentBtn" data-id="${row.id}">
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