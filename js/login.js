document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    // Simple email pattern
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (username === "" || email === "" || password === "") {
        message.style.color = "red";
        message.textContent = "All fields are required!";
        return;
    }

    if (!emailPattern.test(email)) {
        message.style.color = "red";
        message.textContent = "Enter a valid email address!";
        return;
    }

    if (password.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must be at least 6 characters!";
        return;
    }

    message.style.color = "green";
    message.textContent = "Login successful! (Demo only)";
});
