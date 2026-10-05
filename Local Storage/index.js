// Write your code below 
const handleFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('username', event.target.username.value);
    localStorage.setItem('email', event.target.email.value);
    localStorage.setItem('phone', event.target.phone.value);
}
module.exports = handleFormSubmit;