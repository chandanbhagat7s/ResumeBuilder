
import '@babel/polyfill'
import { addDetails, login, signup } from './functions';

let addExp = document.getElementById("addExp")
let expBox = document.getElementById("expBox")


let logins = document.querySelector('.login');
let signIn = document.querySelector('.signupPage');
let resumeForm = document.querySelector('#resumeForm');




if (addExp) {
    addExp.addEventListener("click", (e) => {
        e.preventDefault()
        expBox.insertAdjacentHTML("beforeend", ` <br>
        <div id="expBox">
        Category
        <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="category1" placeholder="Field : Computer , Mechanical , Civil ..etc"  />
        Years you Worked
        <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="exp1" placeholder="Year : 1,2  or months : 0.5,0.6"  />
        From To (year)
        <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="fromto1" placeholder="2021-2022"  />
        Position
        <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="position1" placeholder="Web developer, android dev.."  />
        </div>`)


    })
}
if (resumeForm) {
    resumeForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let obj = {};
        Array.from(e.target).map(el => {
            if (el.id) {
                obj[el.id] = el.value
            }
        })
        obj.experience = {
            first: {
                category: obj.category || '',
                fromto: obj.fromto || '',
                exp: obj.exp || '',
                position: obj.position || '',
            }, second: {
                category: obj.category1 || '',
                fromto: obj.fromto1 || '',
                exp: obj.exp1 || '',
                position: obj.position1 || '',
            }
        }
        obj.education = {
            class10: {
                schoolName: obj.class10,
                board: obj.board10,
                passingYear: obj.passing10,
            },
            class12: {
                collegeName: obj.class12,
                board: obj.board12,
                passingYear: obj.passing12,
            },
            degree: {
                collegeName: obj.collegeName,
                universityName: obj.universityName,
                passingYear: obj.yearOfPassingCollege,
            },
        }
        obj.skills = obj.skills.split(',')
        console.log(obj);



        addDetails(obj)


    })

}



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
























