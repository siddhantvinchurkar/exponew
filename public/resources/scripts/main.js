window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in', {
    'size': 'invisible',
    'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        var phoneNumber = "+919900608821"
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function(confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
            }).catch(function(error) {
                // Error; SMS not sent
                // ...
            });
    }
});

window.onload = function() {
    $('.parallax').parallax();
    $('.scrollspy').scrollSpy();

    firebase.auth().languageCode = 'en';

}