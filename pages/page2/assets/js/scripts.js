// Load stored accounts from localStorage or initialize an empty array
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

// Save accounts to localStorage
function saveAccounts() {
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Registration Function
function registerAccount() {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    // Input validation
    if (!email || !password) {
        alert("Both email and password are required!");
        return;
    }

    // Check if email is already registered
    if (accounts.some(account => account.email === email)) {
        alert("This email is already registered!");
        return;
    }

    // Add new account and save to localStorage
    accounts.push({ email, password });
    saveAccounts();

    alert("Registration successful! You can now log in.");
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
}

// Login Function
function loginAccount() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Check if email and password match an existing account
    const user = accounts.find(account => account.email === email && account.password === password);

    if (user) {
        alert("Login successful! Welcome back.");
        window.location.href = "../../index.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
}
