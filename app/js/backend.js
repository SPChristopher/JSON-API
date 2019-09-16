$(document).ready(function () {
    var table = $('#data').DataTable({
        initComplete: function () {
            this.api().columns([4]).every(function () {
                var column = this;
                var select = $('<select><option value="">Todo</option></select>')
                    .appendTo($(column.header()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });
                column.data().unique().sort().each(function (d, j) {

                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        },
        columnDefs: [{ targets: [/*1, 2, 3, 4*/], searchable: false }],
        bStateSave: false,
        processing: true,
        bSortable: true,
        serverSide: false,
        ajax: {
            url: 'http://localhost:3000/employees/',
            dataSrc: '',
            contentType: "application/json",
            async: true,
            dataType: 'json',
            type: "GET"
        },
        columns: [
            { data: "id" },
            { data: "first_name" },
            { data: "last_name" },
            { data: "email" },
            { data: "gender" },
        ]

    })

    table.on('search.dt', function () {
        $('#count').html("Filas: " + table.rows({ search: 'applied' }).data().length);
    })
});