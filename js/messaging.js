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
        });
    })
    .catch(function (err) {
        alert(err);
        console.log(err);
        console.log('Unable to get permission to notify.', err);
    });

messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
});