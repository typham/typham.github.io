function loadAds() {
    $('.ads').empty();
    database.ref('/Ads/').once('value').then(function (snapshot) {
        for (var key in snapshot.val()) {
            var v = snapshot.val()[key];
            var item = '<img src="'+ v.Url +'" style="display:block;margin:10px">';
            $('.ads').append(item);
        }
    });
}

database.ref('/Ads/').on('value', function (snapshot) {
    loadAds();
});

$(function () {

});