function validateForm() {

    let user = {
        username: document.getElementById("username-field").value,
        password: document.getElementById("password-field").value
    }

    if(!(user.username === "admin@admin" && user.password === "password")) {
        $(".login-form").css("margin-top","0")
        $("#invalid-login-prompt").show(200);
        return false;
    }
    else {
        console.log("valid user");
        return true;
    }
}
