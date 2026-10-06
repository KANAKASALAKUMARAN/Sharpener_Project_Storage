document.addEventListener("DOMContentLoaded", initialize);

// When the page get load display all users
function initialize() {
    const ul = document.querySelector("ul");
    if (ul) {
        ul.innerHTML = "";
    }
     const usersList = JSON.parse(localStorage.getItem("usersList")) || [];

     usersList.forEach((user) => {
         display(user);
     });

 }

// add new users in usersList array
function handleFormSubmit(event) { 
    
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const user = {
        id: Date.now(),
        username: username,
        email: email,
        phone: phone
    };

    let usersList = JSON.parse(localStorage.getItem("usersList")) || [];

    usersList.push(user);
    localStorage.setItem("usersList", JSON.stringify(usersList));

    display(user);

    if (typeof event.target.reset === "function") {
        event.target.reset();
    }
    else {
        document.querySelector("form").reset();
    }

}

// use this function to display user on screen
function display(user) {

    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.textContent = `${user.username} ${user.email} ${user.phone}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
        deleteData(user.id, li);
    })
    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

 // use this function to delete the user details from local store and DOM (screen)
function deleteData(id, li) {
    
    let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    
    let updatedUsersList = [];
    for (let i = 0; i < usersList.length; i++){
        if (usersList[i].id !== id) {
            updatedUsersList.push(usersList[i]);
        }
    }
    localStorage.setItem("usersList", JSON.stringify(updatedUsersList));
    li.remove();
 }
 module.exports = handleFormSubmit
