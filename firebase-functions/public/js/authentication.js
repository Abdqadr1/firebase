const switchLinks = document.querySelectorAll(".switch");
const modals = document.querySelectorAll(".auth .modal");
const wrapper = document.querySelector(".auth");
const loginForm = document.querySelector('.login');
const registerForm = document.querySelector('.register');
const signOut = document.querySelector('.sign-out');

//toggle modals 
switchLinks.forEach(item => {
    item.addEventListener('click', () => {
        modals.forEach(modal => modal.classList.toggle('active'));
    });
});

// sign in users
loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        console.log('signed in', user);
        loginForm.reset();
    }).catch(err => {
        loginForm.querySelector(".error").textContent = err.message;
    })
});

// register new users
registerForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = registerForm["email"].value;
    const password = registerForm.password.value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        console.log('registered', user);
        registerForm.reset();
    }).catch(err => {
        registerForm.querySelector(".error").textContent = err.message;
    })
});


//sign users out
signOut.addEventListener('click', () => {
    firebase.auth().signOut().then(() =>{
        console.log('signed out');
    })
});


//listen for auth changes
firebase.auth().onAuthStateChanged((user) => {
    if(user){

        wrapper.classList.remove('open');
        modals.forEach(modal => modal.classList.remove('active'));
    }else{
        wrapper.classList.add('open');
        modals[0].classList.add('active');
    }
})



