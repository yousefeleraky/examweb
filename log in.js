document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const registeredEmail = urlParams.get('email');
    const registeredPassword = urlParams.get('password');
    var firstName = urlParams.get('firstName')
    const enteredEmail = document.getElementById("email").value;
    const enteredPassword = document.getElementById("password").value;

    let isValid = true;

    document.getElementById("emailErrorMessage").style.display = "none";
    document.getElementById("passwordErrorMessage").style.display = "none";

    if (enteredEmail !== registeredEmail) {
        document.getElementById("emailErrorMessage").style.display = "block";
        isValid = false;
    }

    if (enteredPassword !== registeredPassword) {
        document.getElementById("passwordErrorMessage").style.display = "block";
        isValid = false;
    }

    if (isValid) {
        window.location.href = "exam.html";
    }
    if (isValid){
    var x = `exam.html?name=${encodeURIComponent(firstName)}`;
     window.location.href = x}
});
