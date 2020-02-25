window.onload = function () {

    /* Initialize UI */

    $('.parallax').parallax();
    $('.scrollspy').scrollSpy();
    $('.tooltipped').tooltip();
    $('.materialboxed').materialbox();

    /* Initialize Firebase */

    firebase.initializeApp({
        apiKey: "AIzaSyDwzcHupYnToXQSbLeE6QlD068rCnkiJBc",
        authDomain: "projectartemis.firebaseapp.com",
        databaseURL: "https://projectartemis.firebaseio.com",
        projectId: "projectartemis",
        storageBucket: "projectartemis.appspot.com",
        messagingSenderId: "808809502947",
        appId: "1:808809502947:web:1a16966d891c4c36228dd6",
        measurementId: "G-5RK12N8Q6N"
    });


    /* Initialize Firebase Firestore */

    var db = firebase.firestore();

    /* Authentication */

    firebase.auth().languageCode = 'en';

    $('#sign-in').click(function () {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            $('#page-content').css('display', 'none');
            $('#signed-in-content').css('display', 'block');
            db.collection('products').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    $('#card-holder').append('<div class="col s12 m12 l4 xl4"><div class="card"><div class="card-image"> <img class="materialboxed lazyload" data-caption="This furniture is the best!" src="' + doc.data().product_image + '"> <a id="' + doc.id + '" class="right tooltipped btn-floating btn-large halfway-fab waves effect waves light red" data-position="bottom" data-tooltip="Add to cart"><i class="material-icons">add_shopping_cart</i></a></div><div class="card-content"><h3>' + doc.data().product_name + '</h3><h5> <strike style="font-size: 0.75em; ">₹ ' + doc.data().product_price + '</strike> <b>₹ ' + doc.data().product_price_dsctd + '</b></h5><p>' + doc.data().product_description + '</p></div></div></div>');
                });
                $('.tooltipped').tooltip();
                $('.materialboxed').materialbox();

            }).catch(function (error) { console.error(error); });
        }).catch(function (error) {
            alert('Sign in unsuccessful!');
        });
    });

}