function signinclick() {

    console.log("anuthing");

    let user = {
        username: document.getElementById("username_field").value,
        password: document.getElementById("password_field").value
    }

    if(!(user.username === "admin" && user.password === "password")) {
        $("invalid_login_prompt").prop("display","inline");
    }
    else {
        console.log("valid user");
    }
}
