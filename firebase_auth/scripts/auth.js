//make someone an admin
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener('submit', event =>{
    event.preventDefault();
    const adminEmail = adminForm['admin-email'].value;
    const addAdminFunction = functions.httpsCallable('addAdminRole');
    addAdminFunction({email: adminEmail}).then((result) => {
        adminForm.reset();
        console.log(result);
    });
})
// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user){
        user.getIdTokenResult().then(idTokenResult =>{
            user.admin = idTokenResult.claims.admin;
            user.level = idTokenResult.claims.level;
            setupUI(user);
        })
        // real time database
        database.collection('guides').orderBy('title').onSnapshot(snapshot => {
            
            setupGuides(snapshot.docs);
        }, (err) => {
            console.log(err.message);
            });
    } else{
        setupUI();
        setupGuides([]);
    }
});

const createForm = document.querySelector("#create-form");
createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    database.collection("guides").add({
        title: createForm["title"].value,
        content: createForm["content"].value 
    }).then(() => {
        // close modal and reset form
        const modal = document.querySelector("#modal-create");
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err =>{
        console.log(err.message);
    })
})

// signup
const signup_form = document.querySelector('#signup-form');
signup_form.addEventListener('submit', function(event){
    event.preventDefault();

    const email = signup_form['signup-email'].value;
    const password = signup_form['signup-password'].value;

   //sign up user
   auth.createUserWithEmailAndPassword(email, password).then(cred => {
       return database.collection('users').doc(cred.user.uid).set({
            bio: signup_form['signup-bio'].value,
       });
   }).then(()=>{
        const modal = document.querySelector("#modal-signup");
       M.Modal.getInstance(modal).close();
       signup_form.reset();
       signup_form.querySelector('.error').innerHTML = "";

   }).catch(err=>{
       signup_form.querySelector('.error').innerHTML = err.message;
   })
})

const logout = document.querySelector("#logout");
logout.addEventListener('click', event =>{
    event.preventDefault();

    // sign users out
    auth.signOut();
})

const loginform = document.querySelector("#login-form");
loginform.addEventListener("submit", event => {
    event.preventDefault();
    const email = loginform["login-email"].value;
    const password = loginform["login-password"].value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{

        const modal = document.querySelector("#modal-login");
       M.Modal.getInstance(modal).close();
       signup_form.reset();
       loginform.querySelector('.error').innerHTML = "";
    }).catch(err=>{
        loginform.querySelector('.error').innerHTML = err.message;
    });
})