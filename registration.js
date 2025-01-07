document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const firstNameRegex = /^[A-Za-z]+$/;
    const lastNameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let isValid = true;

    // Reset error messages
    document.getElementById("firstNameErrorMessage").style.display = "none";
    document.getElementById("lastNameErrorMessage").style.display = "none";
    document.getElementById("emailErrorMessage").style.display = "none";

    if (!firstNameRegex.test(firstName)) {
        document.getElementById("firstNameErrorMessage").style.display = "block";
        isValid = false;
    }

    if (!lastNameRegex.test(lastName)) {
        document.getElementById("lastNameErrorMessage").style.display = "block";
        isValid = false;
    }

    if (!emailRegex.test(email)) {
        document.getElementById("emailErrorMessage").style.display = "block";
        isValid = false;
    }

    if (isValid) {
        // Redirect with parameters if valid
        const url = `log in.html?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&firstName=${encodeURIComponent(firstName)}`;
        window.location.href = url;
    }
});