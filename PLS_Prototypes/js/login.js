function signinclick() {

    console.log(document.getElementById("username_field").value);

    let user = {
        username: document.getElementById("username_field").value,
        password: document.getElementById("password_field").value
    }

    if(!(user.username === "admin@admin" && user.password === "password")) {
        $("invalid_login_prompt").prop("visibility","visible");
    }
    else {
        console.log("valid user");
    }
}
