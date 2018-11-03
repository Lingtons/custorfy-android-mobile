import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

    constructor() { }


    /*  Login Universal Data
    ==============================*/
    getDataForLoginPage = () => {
        let data = {
            "logo": "assets/images/custorfy-logo.png",
            "txtHint": "Fill in your details",
            "btnLogin": "Login",
            "btnSignup": "Sign Up",
            "txtUsername" : "E.g. John Doe",
            "txtEmail" : "E.g. Johndoe@app.com",
            "txtPhone" : "E.g. 07012345678",
            "txtPassword" : "Password",
            "txtForgotPassword" : "Forgot password?",
            "btnResetYourPassword": "Reset your password",
            "txtSignupnow" : "Don't have an account?",
            "txtLoginnow" : "Already have an account ?",
            "btnSignupnow": "Signup now",
            "btnLoginnow": "Login now",
            "title": "Custorfy",
            "subtitle": "please login to your account.",
            "errorUser" : "Field can't be empty.",
            "errorPassword" : "Field can't be empty."
        };
        return data;
    };


}
