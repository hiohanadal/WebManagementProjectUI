window.onload = function (e) {

    var loginButton = document.getElementById("loginButton");

    var emailTxt = document.getElementById("emailTxt");

    var passwordTxt = document.getElementById("passwordTxt");

    emailTxt.focus();

    loginButton.onclick = function (e) {

        e.preventDefault();
        var email = emailTxt.value;
        var password = passwordTxt.value;

        if (email == "") {
            showErrorMessage("Email field is required.");
        }

        else if (password == "") {
            showErrorMessage("Password field is required");
        }

        else {
            login(email, password);
        }

        function showErrorMessage(message) {

            var spanError = document.getElementById("spanError");
            spanError.innerText = message;
            spanError.style.display = "block";

            setTimeout(function () {

                spanError.style.display = "none";

            }, 5000);
        }

        function login(email, password) {
            var data = JSON.stringify({
                "email": email,
                "password": password
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {

                    var loginResult = JSON.parse(this.responseText);

                    if (loginResult.success) {
                        localStorage.setItem("userGuid", loginResult.userGuid);
                        window.location.href = "home.html";

                    }
                    else {
                        showErrorMessage(loginResult.message);
                    }
                }
            });

            xhr.open("POST", "https://localhost:7116/api/user/login");
            xhr.setRequestHeader("accept", "text/plain");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);
        }

    }


}