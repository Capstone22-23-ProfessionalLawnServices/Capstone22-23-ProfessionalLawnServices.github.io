function signinclick() {

    let user = {
        username: document.getElementById("username_field").value,
        password: document.getElementById("password_field").value
    }

    if(user.username.length === 0 ) {
        console.log("invalid user");
        $("#username_fieldr").css("border", "red")
    }

    if(user.password.length === 0) {
        console.log(user.password);
    }

    else {
        console.log("valid user");
    }
}
