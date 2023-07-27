var Name = document.querySelector('#name');
var emailRegester = document.querySelector('#emailRegester');
var passwordRegester = document.querySelector('#passwordRegester');
var buttonRegester = document.querySelector('#buttonRegester');
var emailLogin = document.querySelector('#emailLogin');
var passwordLogin = document.querySelector('#passwordLogin');
var Regester = document.querySelector('#Regester');
var Login = document.querySelector('#Login');
var signUp = document.querySelector('#signUp');
var signIn = document.querySelector('#signIn');
var buttonLogin = document.querySelector('#buttonLogin');
var row = document.querySelector('#row');
var Logout = document.querySelector('#Logout');
var navBar =document.querySelector('#navBar');
var myPosts = [];
var x;
var containerR;
if (localStorage.getItem('email') == null) {
    containerR = [];
}
else {
    containerR = JSON.parse(localStorage.getItem('email', containerR))
}
function createEmailRegester() {
    var emails = {
        name: Name.value,
        email: emailRegester.value,
        password: passwordRegester.value,
    }
    containerR.push(emails);
    localStorage.setItem('email', JSON.stringify(containerR));
}
buttonRegester.addEventListener('click', function () {
    let checkName = document.querySelector('#checkName');
    let checkEmailR = document.querySelector('#checkE-mailR');
    let checkPasswordR = document.querySelector('#checkPassword');
    if (Name.value == '') {
        checkName.classList.replace('d-none', 'd-block');
        Name.focus();
    }
    else if (emailRegester.value == '') {
        checkEmailR.classList.replace('d-none', 'd-block');
        emailRegester.focus();
    }
    else if (passwordRegester.value == '') {
        checkPasswordR.classList.replace('d-none', 'd-block');
        passwordRegester.focus();
    }
    else {
        createEmailRegester();
        checkName.classList.replace('d-block', 'd-none');
        Name.value = '';
        checkEmailR.classList.replace('d-block', 'd-none');
        emailRegester.value = '';
        checkPasswordR.classList.replace('d-block', 'd-none');
        passwordRegester.value = '';
        Login.classList.replace('d-none', 'd-flex');
        Regester.classList.replace('d-flex', 'd-none');
    }
});
signIn.addEventListener('click', function () {
    Login.classList.replace('d-none', 'd-flex');
    Regester.classList.replace('d-flex', 'd-none');
    Name.value = '';
    emailRegester.value = '';
    passwordRegester.value = '';
})
signUp.addEventListener('click', function () {
    Login.classList.replace('d-flex', 'd-none');
    Regester.classList.replace('d-none', 'd-flex');
    emailLogin.value = '';
    passwordLogin.value = '';
});
buttonLogin.addEventListener('click', function () {
    let checkEmailL = document.querySelector('#checkEmailL');
    let checkPasswordL = document.querySelector('#checkPasswordL')
    if (emailLogin.value === '') {
        checkEmailL.classList.replace('d-none', 'd-block');
        emailLogin.focus();
    }
    else if (passwordLogin.value === '') {
        checkPasswordL.classList.replace('d-none', 'd-block');
        passwordLogin.focus();
    }
    else {
        for (let i = 0; i < containerR.length; i++) {
            if (containerR[i].email === emailLogin.value && containerR[i].password === passwordLogin.value) {
                apiData();
                Login.classList.replace('d-flex', 'd-none');
                row.classList.replace('d-none', 'd-flex');
                navBar.classList.replace('d-none','d-block');
            }
            else {
                let Check = document.querySelector('#Check');
                Check.classList.replace('d-none','d-block');
            }
            emailLogin.value = '';
            passwordLogin.value = '';
            checkEmailL.classList.replace('d-block', 'd-none');
            checkPasswordL.classList.replace('d-block', 'd-none');
        }
    }
});
function apiData(){

    var myHttp = new XMLHttpRequest();
    myHttp.open('GET', 'https://forkify-api.herokuapp.com/api/search?&q=pasta');
    myHttp.send();
    myHttp.addEventListener('readystatechange', function () {
        if (myHttp.readyState == 4) {
            myPosts = JSON.parse(myHttp.response).recipes;
            display()
        }
    });
    }
    function display() {
        var cartona = '';
        for (let i = 0; i < myPosts.length; i++) {
            cartona += `                    <div class="col-md-4 ">
            <a href="${myPosts[i].source_url}" class="text-decoration-none text-white">
            <img src="${myPosts[i].image_url}" class="w-100 rounded-3" alt="">
            <h2 class="p-3 fw-bold text-center">${myPosts[i].title}</h2>
            </a>
        </div>`
        }
        row.innerHTML = cartona;
    };
Logout.addEventListener('click', function(){
    Login.classList.replace('d-none','d-flex');
    navBar.classList.replace('d-block','d-none');
    row.classList.replace('d-flex','d-none')
})