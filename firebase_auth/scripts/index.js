const guidesList = document.querySelector(".guides");
const loggedoutLinks = document.querySelectorAll('.logged-out');
const loggedinLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if(user){

  // show account details ;
    database.collection('users').doc(user.uid).get().then((doc)=>{
       let html = `
       <div>Logged in as ${user.email}</div>
       <div>Bio: ${doc.data().bio}</div>
       <div class="pink-text">${user.admin ? 'Admin' : ''}</div>`;

        accountDetails.innerHTML = html;
    })

    //if user is an admin
    if(user.admin){
      adminItems.forEach(item =>{item.style.display = "block";});
    }
   
    // toggle ui elements
    loggedinLinks.forEach(item => item.style.display='block');
    loggedoutLinks.forEach(item => item.style.display='none');
  }else{

    adminItems.forEach(item =>{item.style.display = "none";});
    accountDetails.innerHTML = '';
    // toggle ui elements
    loggedinLinks.forEach(item => item.style.display='none');
    loggedoutLinks.forEach(item => item.style.display='block');
  }
}

const setupGuides = (data) => {

  if(data.length){
    let html = '';
    data.forEach(element => {
      const guide = element.data();
      const li = `
      <li>
          <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class=" collapsible-body white">${guide.content}</div>
      </li>
      `;
      html += li;
    });

      guidesList.innerHTML = html;
  }else{
    guidesList.innerHTML= `<h5 class="center-align">Login to view guides</h5>`;
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });