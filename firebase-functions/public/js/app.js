const addRequest = document.querySelector('.add-request');
const newRequest = document.querySelector('.new-request');
const requestForm = document.querySelector('.new-request-form');
const notification = document.querySelector(".notification");

addRequest.addEventListener('click', () =>{
    newRequest.classList.add('open');
})

newRequest.addEventListener('click', event =>{
    if(event.target.classList.contains('new-request')){
        newRequest.classList.remove('open');
    }
});

requestForm.addEventListener('submit', event =>{
    event.preventDefault();

    const addRequest = firebase.functions().httpsCallable("addRequest");

    addRequest({text: requestForm.request.value}).then((result) => {
        requestForm.reset();
        requestForm.querySelector(".error").textContent = "";
        newRequest.classList.remove("open");
    }).catch(err =>{
        requestForm.querySelector(".error").textContent = err.message;
    })
})

const showNotification = (message) => {
    notification.textContent = message;
    notification.classList.add("active");

    setTimeout(function(){
        notification.classList.remove("active");
        notification.textContent = "";
    }, 3000);
}



