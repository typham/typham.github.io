function load() {
    $('#notifications tbody').empty();
    database.ref('/Notifications/').once('value').then(function (snapshot) {
        for (var key in snapshot.val()) {
            var v = snapshot.val()[key];
            var tr = '<tr data-key="' + key + '" data-id="' + v.Id + '"><td>' + v.Name + '</td><td>'+ v.Content + '</td><td><button class="delete" data-index="' + key + '">Delete</button></td></tr>';
            $('#notifications tbody').append(tr);
        }
    });
}

function deleteItem(idx) {
    database.ref('/Notifications/' + idx).remove();
}

function updateItem(key, Item) {
    var updates = {};
    updates['/Notifications/' + key + '/'] = Item;

    return database.ref().update(updates);
}

database.ref('/Notifications/').on('value', function (snapshot) {
    load();
});

$(function () {
    $('#add').click(function () {
        var newIndex = $('#notifications tbody tr').length;
        var data = {
            "Id": newIndex + 1,
            "Name": $('.Name').val(),
            "Content": $('.Content').val()
        };
        database.ref('Notifications/' + newIndex).set(data);

        // send message to client
        var notificationContent = {"notification": {
                    "title": data.Name,
                    "body": data.Content,
                    "click_action" : "http://localhost:90/notification.html",
                    "icon": "/images/icons/circular-clock.png"
                    },
                    "to" : "/topics/notifications"
        };

        $.ajax({
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AIzaSyDvvGlVKei-Im7McheLZNwvyWCaagkHxPI'
            },
            data: JSON.stringify(notificationContent),
            type: 'post',
            success: function () {
                console.log('Send message ok');
            }
        });
    });

    $(document).on('click', '.delete', function () {
        deleteItem($(this).attr('data-index'));
    });
});
