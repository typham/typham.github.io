function loadCategories() {
    $('#categories tbody').empty();
    database.ref('/Categories/').once('value').then(function (snapshot) {
        for (var key in snapshot.val()) {
            var v = snapshot.val()[key];
            var tr = '<tr data-key="' + key + '" data-id="' + v.Id + '"><td>' + v.Id + '</td><td><input value="' + v.Name + '" class="txtName"/></td><td><button class="delete" data-index="' + key + '">Delete</button></td></tr>';
            $('#categories tbody').append(tr);
        }
    });
}

function deleteItem(idx) {
    database.ref('/Categories/' + idx).remove();
}

function updateItem(key, Item) {
    var updates = {};
    updates['/Categories/' + key + '/'] = Item;

    return database.ref().update(updates);
}

database.ref('/Categories/').on('value', function (snapshot) {
    loadCategories();
});

$(function () {
    $('#add').click(function () {
        var newIndex = $('#categories tbody tr').length;
        database.ref('Categories/' + newIndex).set({
            "Id": newIndex + 1,
            "Name": $('.category-name').val()
        });
    });

    $(document).on('keyup', '.txtName', function () {
        var key = $(this).parents('tr').attr('data-key');
        var Item = {
            Id: $(this).parents('tr').attr('data-id'),
            Name: $(this).val()
        };

        updateItem(key, Item);
    });

    $(document).on('click', '.delete', function () {
        deleteItem($(this).attr('data-index'));
    });
});