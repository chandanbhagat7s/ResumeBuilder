
import '@babel/polyfill'
import { login, signup } from './functions';

let logins = document.querySelector('.login');
let signIn = document.querySelector('.signupPage');



if (logins) {


    logins.addEventListener('submit', e => {
        e.preventDefault();
        // console.log("came");
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('current-password').value;
        login(email, password);
    })

}


if (signIn) {


    signIn.addEventListener('submit', e => {
        e.preventDefault();
        console.log("came signin");
        const name = document.getElementsByClassName('signup-name')[0].value;
        const email = document.getElementsByClassName('signup-email')[0].value;
        const mobile = document.getElementsByClassName('signup-number')[0].value;
        const password = document.getElementsByClassName('signup-password')[0].value;
        const cnfPassword = document.getElementsByClassName('signup-cnfPassword')[0].value;
        console.log(email, password, cnfPassword, mobile);
        if (!name || !email || !mobile || !password || !cnfPassword) {
            return alertt('danger', 'please provide all the details')
        }
        signup(name, email, password, mobile, cnfPassword);
    })




}
























