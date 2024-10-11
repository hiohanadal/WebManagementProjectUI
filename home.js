window.onload = function (e) {

    var userGuid = localStorage.getItem("userGuid");

    if (userGuid == null) {

        window.location.href = "login.html";
    }
    else {
        getUser(userGuid);
    }

    var lnkSair = document.getElementById("lnkSair");

    lnkSair.onclick = function (e) {
        localStorage.removeItem("userGuid");

        window.location.href = "login.html";
    }

    var icon = document.querySelector(".icon");

    icon.onclick = function (e) {
        var menu = document.querySelector(".topnav")

        if (menu.className == "topnav") {
            menu.className += " open";
        }
        else {
            menu.className = "topnav";
        }
    }

    function getUser(userGuid) {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.success) {
                    var spnMessage = document.getElementById("spnMessage");

                    spnMessage.innerText = "Welcome to the system " + result.name;
                }
                else {
                    window.location.href = "login.html";
                }
            }
        });

        xhr.open("GET", "https://localhost:7116/api/user/getUser?userGuid=" + userGuid);

        xhr.send();
    }
}