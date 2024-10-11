window.onload = function (e) {

    var forgotPasswordButton = document.getElementById("forgotPasswordButton");

    var cpfTxt = document.getElementById("cpfTxt");

    var emailTxt = document.getElementById("emailTxt");

    cpfTxt.focus();

    forgotPasswordButton.onclick = function (e) {

        e.preventDefault();

        var cpf = cpfTxt.value;
        var email = emailTxt.value;

        if (email == "" || cpf == "") {
            showErrorMessage("Required fields not filled out.");
        }

        else {
            recoverPassword(email, cpf);
        }

        function showErrorMessage(message) {

            var spanError = document.getElementById("spanError");
            spanError.innerText = message;
            spanError.style.display = "block";

            setTimeout(function () {

                spanError.style.display = "none";
            }, 5000);
        }
        function recoverPassword(email, cpf) {

            var data = JSON.stringify({
                "email": email,
                "cpf": cpf
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {

                    var result = JSON.parse(this.responseText);

                    if (result.success) {
                        alert("Password reset e-mail sent.");
                    }

                    else {
                        showErrorMessage(result.message);
                    }
                }
            });

            xhr.open("POST", "https://localhost:7116/api/user/forgotPassword");
            xhr.setRequestHeader("accept", "text/plain");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);

            alert(email + " follow the step-by-step instructions sent to your email.");
        }


    }


}

