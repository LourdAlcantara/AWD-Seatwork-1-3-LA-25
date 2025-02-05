// Array to store registered accounts
let accounts = [];

// Registration Function
function registerAccount() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Input validation
    if (email === "" || password === "") {
        alert("Both email and password are required!");
        return;
    }

    // Check if the email is already registered
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email === email) {
            alert("This email is already registered!");
            return;
        }
    }

    // Add a new account
    accounts.push({ email, password });
    alert("Registration successful! You can now log in.");
}

// Login Function
function loginAccount() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Check if email and password match an existing account
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email === email && accounts[i].password === password) {
            alert("Login successful! Welcome back.");

            window.location.href = "../../index.html";
            return;
        }
    }

    alert("Invalid email or password. Please try again.");
}