window.onload = function (e) {

    var registerButtonTxt = document.getElementById("registerButton");

    var nameTxt = document.getElementById("nameTxt");
    var lastNameTxt = document.getElementById("lastNameTxt");
    var cpfTxt = document.getElementById("cpfTxt");
    var genderTxt = document.getElementById("genderTxt");
    var phoneTxt = document.getElementById("phoneTxt");
    var addressTxt = document.getElementById("addressTxt");
    var emailTxt = document.getElementById("emailTxt");
    var passwordTxt = document.getElementById("passwordTxt");

    nameTxt.focus();

    registerButtonTxt.onclick = function (e) {

        e.preventDefault();

        var name = nameTxt.value;
        var lastName = lastNameTxt.value;
        var cpf = cpfTxt.value;
        var gender = genderTxt.value;
        var phone = phoneTxt.value;
        var address = addressTxt.value;
        var email = emailTxt.value;
        var password = passwordTxt.value;

        if (email == "" || password == "" || name == "" || lastName == "" || cpf == "" || phone == "" || address == "") {
            showErrorMessage("Required fields not provided.");
        }

        else {
            register(email, password, name, lastName, cpf, gender, phone, address);
        }

        function showErrorMessage(message) {

            var spanError = document.getElementById("spanError");
            spanError.innerText = message;
            spanError.style.display = "block";

            setTimeout(function () {

                spanError.style.display = "none";

            }, 5000);

        }
        function register(email, password, name, lastName, cpf, gender, phone, address) {

            var data = JSON.stringify({

                "name": name,
                "lastName": lastName,
                "email": email,
                "address": address,
                "phone": phone,
                "cpf": cpf,
                "gender": gender,
                "password": password
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {

                    var result = JSON.parse(this.responseText);

                    if (result.success) {
                        localStorage.setItem("userGuid", result.userGuid);

                        window.location.href = "home.html";
                    }

                    else {
                        showErrorMessage(result.message);
                    }

                }
            });

            xhr.open("POST", "https://localhost:7116/api/user/registration");
            xhr.setRequestHeader("accept", "text/plain");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);

            alert("The registration has been completed for the user." + email);
        }

    }


}