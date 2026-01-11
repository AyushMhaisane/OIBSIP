// Function to switch between Login and Register forms
function toggleForms() {
    const loginForm = document.getElementById("login-form");
    const regForm = document.getElementById("register-form");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        regForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        regForm.style.display = "block";
    }
}

// Handle Registration
function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const pass = document.getElementById("reg-pass").value;

    // Check if user already exists
    if (localStorage.getItem("user_" + email)) {
        alert("User already exists! Please login.");
        return;
    }

    // Save user data to LocalStorage
    const user = { name: name, email: email, password: pass };
    localStorage.setItem("user_" + email, JSON.stringify(user));

    alert("Registration Successful! Please login.");
    toggleForms(); // Switch back to login view
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;

    // Retrieve user data
    const storedUser = JSON.parse(localStorage.getItem("user_" + email));

    if (storedUser && storedUser.password === pass) {
        // Create a "session"
        localStorage.setItem("currentUser", email);
        alert("Login Successful! Redirecting...");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email or Password!");
    }
}

// Handle Logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}