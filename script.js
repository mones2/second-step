// Toggle between login and register forms
function toggleForms() {
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    var resetForm = document.getElementById('reset-form');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        resetForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function showForgotPasswordForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('reset-form').style.display = 'block';
}

function showPasswordStrength(password) {
    var strengthIndicator = document.getElementById('password-strength');
    var strength = getPasswordStrength(password);
    strengthIndicator.textContent = strength;
    strengthIndicator.style.color = getStrengthColor(strength);
}

function showPasswordStrengthReset(password) {
    var strengthIndicator = document.getElementById('password-strength-reset');
    var strength = getPasswordStrength(password);
    strengthIndicator.textContent = strength;
    strengthIndicator.style.color = getStrengthColor(strength);
}

function getPasswordStrength(password) {
    var strength = 'Weak';
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[\W]/.test(password)) {
        strength = 'Strong';
    } else if (password.length > 5) {
        strength = 'Moderate';
    }
    return strength;
}

function getStrengthColor(strength) {
    var color = 'red';
    if (strength === 'Moderate') {
        color = 'orange';
    } else if (strength === 'Strong') {
        color = 'green';
    }
    return color;
}

function validatePassword(password) {
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }
    return true;
}

function register(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById('register-username').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;

    if (!validatePassword(password)) {
        return;
    }

    var user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem('user_' + username, JSON.stringify(user));
    alert('Registration successful! Please login.');
    toggleForms(); // Show login form
}

function login(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;

    var storedUser = JSON.parse(localStorage.getItem('user_' + username));

    if (storedUser && storedUser.password === password) {
        alert('Login successful!');
        localStorage.setItem('currentUser', username);
        window.location.href = 'main.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

function resetPassword(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById('reset-username').value;
    var email = document.getElementById('reset-email').value;
    var storedUser = JSON.parse(localStorage.getItem('user_' + username));

    if (storedUser && storedUser.email === email) {
        var newPasswordInput = document.getElementById('new-password');
        if (!newPasswordInput) {
            newPasswordInput = document.createElement('input');
            newPasswordInput.type = 'password';
            newPasswordInput.id = 'new-password';
            newPasswordInput.placeholder = 'New Password';
            newPasswordInput.required = true;
            newPasswordInput.oninput = function() {
                showPasswordStrengthReset(this.value);
            };
            document.getElementById('reset-form').appendChild(newPasswordInput);

            var strengthIndicator = document.createElement('div');
            strengthIndicator.id = 'password-strength-reset';
            document.getElementById('reset-form').appendChild(strengthIndicator);

            var submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Update Password';
            submitButton.onclick = updatePassword;
            document.getElementById('reset-form').appendChild(submitButton);
        }
    } else {
        alert('Invalid username or email. Please try again.');
    }
}

function updatePassword(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById('reset-username').value;
    var newPassword = document.getElementById('new-password').value;

    if (!validatePassword(newPassword)) {
        return;
    }

    var storedUser = JSON.parse(localStorage.getItem('user_' + username));
    storedUser.password = newPassword;
    localStorage.setItem('user_' + username, JSON.stringify(storedUser));
    alert('Password updated successfully! Please login.');
    showLoginForm(); // Show login form
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function loadUser() {
    var currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser;
    }
}

window.onload = loadUser;


function loadCars() {
    var cars = JSON.parse(localStorage.getItem('cars')) || [];
    var cardContainer = document.getElementById('card-container');

    cars.forEach(function(car) {
        var carCard = document.createElement('div');
        carCard.classList.add('card');

        var carImage = document.createElement('img');
        carImage.src = car.image;
        carImage.alt = car.name;
        carCard.appendChild(carImage);

        var carName = document.createElement('h3');
        carName.textContent = car.name;
        carCard.appendChild(carName);

        var carDetails = document.createElement('p');
        carDetails.textContent = car.type + ' / ' + car.year;
        carCard.appendChild(carDetails);

        var carPrice = document.createElement('p');
        carPrice.innerHTML = '<b>$' + car.price + '</b>';
        carCard.appendChild(carPrice);

        // Add delete button

        cardContainer.appendChild(carCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('card-container')) {
        loadCars();
    }
});




// Load cars on the main page

