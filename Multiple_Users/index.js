// Write your code below:
function handleFormSubmit(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const userDetails = {
        username: username,
        email: email,
        phone:phone
    }

    localStorage.setItem(email, JSON.stringify(userDetails));
    getUsersFromLocalStorage(userDetails);

    if (typeof event.target.reset === "function") {
        event.target.reset();
    }
    else {
        document.querySelector("form").reset();
    }
}
function getUsersFromLocalStorage(userDetails) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');

    li.textContent = `${userDetails.username} - ${userDetails.email} -${userDetails.phone}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    deleteBtn.onclick = () => {
        localStorage.removeItem(userDetails.email);
        ul.removeChild(li);
    }

    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

module.exports  = handleFormSubmit;