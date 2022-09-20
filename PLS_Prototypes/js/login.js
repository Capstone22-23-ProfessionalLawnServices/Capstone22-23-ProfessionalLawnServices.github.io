function signinclick() {

    console.log(document.getElementById("username_field").value);

    let user = {
        username: document.getElementById("username_field").value,
        password: document.getElementById("password_field").value
    }

    if(!(user.username === "admin@admin" && user.password === "password")) {
        $(".login_form").css("margin-top","0")
        $("#invalid_login_prompt").show(200);
    }
    else {
        console.log("valid user");
    }
}
