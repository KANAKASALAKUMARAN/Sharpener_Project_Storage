document.addEventListener("DOMContentLoaded", initialize);

// Display all saved users when the page loads
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


// Add a new user or update an existing user
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

    const editId = JSON.parse(sessionStorage.getItem("editId"));

    // If editId exists, update the existing user
    if (editId) {
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].id === editId) {
                usersList[i].username = username;
                usersList[i].email = email;
                usersList[i].phone = phone;
            }
        }

        localStorage.setItem("usersList", JSON.stringify(usersList));

        sessionStorage.removeItem("editId");

        event.target.reset();

        document.getElementById("submitBtn").textContent = "Submit";

        initialize();
        return; //Stops the current function. No need to 
        //add the user again since we are updating an existing one.
    }

    // Otherwise, add a new user
    usersList.push(user);
    localStorage.setItem("usersList", JSON.stringify(usersList));

    display(user);

    if (typeof event.target.reset === "function") {
        event.target.reset();
    } else {
        document.querySelector("form").reset();
    }
}


// Display a user with Update and Delete buttons
function display(user) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");

    li.textContent = `${user.username} ${user.email} ${user.phone} `;

    // Update button
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.className = "update-btn";

    updateBtn.addEventListener("click", () => {
        editData(user);
    });

    li.appendChild(updateBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
        deleteData(user.id, li);
    });

    li.appendChild(deleteBtn);
    ul.appendChild(li);
}


// Fill the form with the selected user's details
function editData(data) {
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");

    usernameInput.value = data.username;
    emailInput.value = data.email;
    phoneInput.value = data.phone;

    // Remember which user is being edited
    sessionStorage.setItem("editId", JSON.stringify(data.id));

    // Change the form button text
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Update";
}


// Delete a user from localStorage and the webpage
function deleteData(id, li) {
    let usersList = JSON.parse(localStorage.getItem("usersList")) || [];

    let updatedUsersList = [];

    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].id !== id) {
            updatedUsersList.push(usersList[i]);
        }
    }

    localStorage.setItem("usersList", JSON.stringify(updatedUsersList));
    li.remove();
}

module.exports = handleFormSubmit;

