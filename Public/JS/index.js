
import '@babel/polyfill'
import { ExtraInformationResumeVariable, addDetails, login, logoutUser, makeTemplate, signup } from './functions';
import axios from 'axios';

let addExp = document.getElementById("addExp")
let expBox = document.getElementById("expBox")
let logout = document.getElementById("logout")
let extraInfo = document.getElementById("extraInfo")


let logins = document.querySelector('#loginfrom');
let ExtraInfo = document.querySelector('#ExtraInfo');
let signIn = document.querySelector('#signinForm');
let resumeForm = document.querySelector('#resumeForm');



if (ExtraInfo) {
    // console.log(user);
    ExtraInfo.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e);
        let obj = {};
        Array.from(e.target).map(el => {
            if (el.id) {
                obj[el.id] = el.value
            }
        })
        obj.skills = obj.skills.split(",")
        obj.hobbies = obj.hobbies.split(",")
        obj.urls = obj.links.split(",")
        console.log("obj is ", obj);
        ExtraInformationResumeVariable(obj);
    })
}

if (logout) {
    // console.log(user);
    logout.addEventListener("click", (e) => {

        logoutUser()
    })
}


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
        console.log(e);
        let obj = {};
        Array.from(e.target).map(el => {
            if (el.id) {
                obj[el.id] = el.value
            }
        })
        // console.log(obj);
        login(obj.email, obj.password);
    })

}


if (signIn) {


    signIn.addEventListener('submit', e => {
        e.preventDefault();
        console.log("came signin");
        let obj = {};
        Array.from(e.target).map(el => {
            if (el.id) {
                obj[el.id] = el.value
            }
        })
        console.log(obj);
        // console.log(email, password, cnfPassword, mobile);
        // if (!name || !email || !mobile || !password || !cnfPassword) {
        //     return alertt('danger', 'please provide all the details')
        // }
        signup(obj.userName, obj.email, obj.password, obj.mobile, obj.confirmPassword);
    })




}
























