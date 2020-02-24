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
        }).catch(function (error) {
            alert('Sign in unsuccessful!');
        });
    });

}