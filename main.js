// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-26mupGFJbe-szXjBAgpOKAdcVcr_yYo",
    authDomain: "syncdevice-7f6e2.firebaseapp.com",
    databaseURL: "https://syncdevice-7f6e2.firebaseio.com",
    storageBucket: "syncdevice-7f6e2.appspot.com",
    messagingSenderId: "938046412598"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function loadCategories() {
    $('#categories tbody').empty();
    firebase.database().ref('/Categories/').once('value').then(function (snapshot) {
        for (var key in snapshot.val()) {
            var v = snapshot.val()[key];
            var tr = '<tr data-key="' + key + '" data-id="' + v.Id + '"><td>' + v.Id + '</td><td><input value="' + v.Name + '" class="txtName"/></td><td><button class="delete" data-index="' + key + '">Delete</button></td></tr>';
            $('#categories tbody').append(tr);
        }
    });
}

function deleteItem(idx) {
    firebase.database().ref('/Categories/' + idx).remove();
}

function updateItem(key, Item) {
    // var Item = {
    //   Id: 3,
    //   Name: 'Category 334'
    // };

    var updates = {};
    updates['/Categories/' + key + '/'] = Item;

    return firebase.database().ref().update(updates);
}

firebase.database().ref('/Categories/').on('value', function (snapshot) {
    loadCategories();
});

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
messaging.requestPermission()
    .then(function () {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
        return messaging.getToken();
    }).then(function (token) {
        console.log(token);
        // Subscribe the client app to topic
        alert(token);
        $.ajax({
            url: 'https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/promotions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AIzaSyDvvGlVKei-Im7McheLZNwvyWCaagkHxPI'
            },
            type: 'post',
            success: function () {
                console.log('Subscribe ok');
            }
        })
    })
    .catch(function (err) {
        alert(err);
        console.log(err);
        console.log('Unable to get permission to notify.', err);
    });

messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);

});

$(function () {
    $('#add').click(function () {
        var newIndex = $('#categories tbody tr').length;
        firebase.database().ref('Categories/' + newIndex).set({
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