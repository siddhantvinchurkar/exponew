var cart = [];
var dets = [];

/* Function to add elments to the  cart */

function addToCart(id) {
    var bool = false;
    if (cart.length == 0) {
        cart.push(id);
        M.toast({ html: 'Item added!' })
    }
    else {
        for (var i = 0; i < cart.length; i++) {
            if (id == cart[i]) {
                bool = true;
            }
        }
        if (!bool) {
            cart.push(id);
            M.toast({ html: 'Item added!' })
        }
    }
}

/* Main function */

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
            $('#sign-in').css('display', 'none');
            $('#sign-out').css('display', 'inline-block');
            db.collection('products').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    $('#card-holder').append('<div class="col s12 m12 l4 xl4"><div class="card"><div class="card-image"> <img class="materialboxed lazyload" data-caption="This furniture is the best!" src="' + doc.data().product_image + '"> <a id="' + doc.id + '" onclick="addToCart(this.id);" class="right tooltipped btn-floating btn-large halfway-fab waves effect waves light red" data-position="bottom" data-tooltip="Add to cart"><i class="material-icons">add_shopping_cart</i></a></div><div class="card-content"><h3>' + doc.data().product_name + '</h3><h5> <strike style="font-size: 0.75em; ">₹ ' + doc.data().product_price + '</strike> <b>₹ ' + doc.data().product_price_dsctd + '</b></h5><p>' + doc.data().product_description + '</p></div></div></div>');
                });
                $('.tooltipped').tooltip();
                $('.materialboxed').materialbox();
            }).catch(function (error) { console.error(error); });
        }).catch(function (error) {
            alert('Sign in unsuccessful!');
        });
    });

    $('#view-cart').click(function () {
        $('#signed-in-content').css('display', 'none');
        $('#cart').css('display', 'block');
        for (var t = 0; t < cart.length; t++) {
            db.collection('products').doc(cart[t]).get().then(function (doc) {
                dets.push('<tr><td>' + doc.data().product_name + '</td><td>₹ ' + doc.data().product_price_dsctd + '</td><td>4</td><td>₹ ' + doc.data().product_price_dsctd + '</td></tr>');
            }).catch(function (error) { console.error(error); });
        }
        setTimeout(function () {
            var cart_string_1 = '<div class="row"><div class="col s12 m12 l8 xl8 offset-l2 offset-xl2"><h1>Shopping Cart</h1><table class="responsive-table highlight"><thead><tr><th>Item Name</th><th>Price</th><th>Quantity</th><th>Amount</th></tr></thead><tbody>';
            for (var h = 0; h < dets.length; h++) {
                cart_string_1 += dets[h];
            }
            var cart_string_2 = '</tbody></table> <br /> <a id="checkout" class="right pink accent-3 waves-effect waves-light btn-large"><i class="material-icons left">payment</i><b>Checkout ₹ 2,400</b></a> <a id="add-more" class="left pink accent-3 waves-effect waves-light btn-large"><i class="material-icons left">add_shopping_cart</i><b>Add More Items</b></a></div></div>';
            $('#cart').html(cart_string_1 + cart_string_2);
        }, 2000);
    });

    $('#add-more').click(function () {
        $('#signed-in-content').css('display', 'block');
        $('#cart').css('display', 'none');
    });

    setInterval(function () {
        if (cart.length > 0) {
            $('#view-cart').css('display', 'inline-block');
            $('#items').html(cart.length);
        }
        else {
            $('#view-cart').css('display', 'none');
        }
    }, 100);

}