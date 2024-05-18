    function getValues() {
      const email = document.querySelector('Email_field').value;
      const username = document.querySelector('Username_field').value;
      const password = document.querySelector('Password_field').value;
      return [email, username, password];
    }
    async function signUp() {
      const email = getValues()[0];
      const username = getValues()[1];
      const password = getValues()[2];
      if(!validate()) {
        alert('Please enter valid data.');
        return;
      }
      try {
       // Fetch a post request to create a new account
       const response = await fetch('/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password
        })
       });
      if(!response.ok) {
        alert('Something went wrong. Please try again later.');
        return;
      }
      const data = await response.json();
      console.log(data);
      } catch (error) {
        // handle error message
        alert('Something went wrong. Please try again later.');
        console.log(error);
      }
    }
    function validate() {
      const email = getValues()[0];
      const username = getValues()[1];
      const password = getValues()[2];
      // Validate email and username
      if (email.trim() === '' || username.trim() === '' || password.trim() === '') {
        alert('Please fill in all the fields');
        return false;
      }
      // Validate password
      if (!validatePassword(password)) {
        alert('Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character');
        return false;
      }
      return true;
    }
    function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
    
    }


    document.addEventListener('DOMContentLoaded', function() {
      document.querySelector('#sign-up-form').addEventListener('submit', function(e) {
        e.preventDefault();
        signUp();
      });
    });