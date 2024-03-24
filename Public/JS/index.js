
import '@babel/polyfill'
import { ExtraInformationResumeVariable, addDetails, login, logoutUser, makeTemplate, signup, updateProfileStatus } from './functions';
import axios from 'axios';
import { showAlert } from './alerts';


let addExp = document.getElementById("addExp")
let expBox = document.getElementById("expBox")
let logout = document.getElementById("logout")
let profileUpdate = document.getElementById("profileUpdate")


let logins = document.querySelector('#loginfrom');
let ExtraInfo = document.querySelector('#ExtraInfo');
let signIn = document.querySelector('#signinForm');
let resumeForm = document.querySelector('#resumeForm');
let templatesTrackBtn = document.querySelectorAll('.template-btn');

if (templatesTrackBtn) {

    console.log(templatesTrackBtn);
    Array.from(templatesTrackBtn).map((el) => {
        console.log(el);
        el.addEventListener("click", async (e) => {
            // take the user id
            // console.log(el);
            console.log(e.target.dataset);
            if (!e.target.dataset.user) {

                showAlert("warning", "login first for the functionality")
                setTimeout(() => {
                    location.assign('/login')
                }, [2000])
            }
            let userData = await axios.get("http://127.0.0.1:3001/api/v1/user/getUser")
            if (!userData) {
                return showAlert("warning", "login or signup first for the functionality")
            }

            if (!userData.data.data.data) {

                showAlert("info", "please complete the details")

                setTimeout(() => {
                    location.assign('/completeDetails')
                }, [1500])

                return

            }
            showAlert("success", "please wait REDIRCTING")
            setTimeout(() => {
                location.assign('/others')
            }, [500])

            // ExtraInformationResumeVariable()
        })




    })
}



if (profileUpdate) {
    // console.log(user);
    profileUpdate.addEventListener("submit", (e) => {
        showAlert("success", "Submitting your information")
        e.preventDefault();
        console.log(e);
        let obj = {};
        Array.from(e.target).map(el => {
            if (el.id) {
                obj[el.id] = el.value
            }
        })
        console.log(obj);
        obj.skills = obj.skill.split(",")
        // obj.hobbies = obj.hobbies.split(",")
        // obj.urls = obj.links.split(",")
        obj.experience = {
            first: {
                about: obj.about1 || '',
                org: obj.org1 || '',
                fromto: obj.fromto1 || '',
                exp: obj.exp1 || '',
                position: obj.position1 || '',
            }, second: {
                org: obj.org2 || '',
                about: obj.about2 || '',
                fromto: obj.fromto2 || '',
                exp: obj.exp2 || '',
                position: obj.position2 || '',
            }
        }
        console.log("obj is ", obj);
        console.log("Called");
        updateProfileStatus(obj)

    })
}




if (ExtraInfo) {
    // console.log(user);
    ExtraInfo.addEventListener("submit", (e) => {
        showAlert("success", "creating your resume please wait")
        e.preventDefault();
        console.log(e);
        let obj = {};
        Array.from(e.target).map(el => {
            if (el.id) {
                obj[el.id] = el.value
            }
        })
        // obj.skills = obj.skills.split(",")
        // obj.hobbies = obj.hobbies.split(",")
        // obj.urls = obj.links.split(",")
        console.log("obj is ", obj);
        console.log("Called");
        obj.skills = obj.skill.split(','); ExtraInformationResumeVariable(obj);
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
        About
        <textarea class="flex h-30 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="about1" placeholder="Field : I have improved and worked as .. and skills i earned... "  ></textarea>
        Years you Worked
        <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="exp1" placeholder="Year : 1,2  or months : 0.5,0.6"  />
        Name of Orgainization for which you worked
            <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="org1" placeholder="company"  />
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
                about: obj.about || '',
                org: obj.org || '',
                fromto: obj.fromto || '',
                exp: obj.exp || '',
                position: obj.position || '',
            }, second: {
                org: obj.org1 || '',
                about: obj.about1 || '',
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
                collegeName: obj.collegeName || '',
                universityName: obj.universityName || '',
                passingYear: obj.yearOfPassingCollege || '',
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
        console.log(obj);
        login(obj.email, obj.password);
    })

}


if (signIn) {


    signIn.addEventListener('submit', e => {
        e.preventDefault();
        console.log("came signin");
        console.log(e);
        let obj = {};


        Array.from(e.target).map(el => {
            if (el.id == 'coverImage') {
                obj[el.id] = el.files[0];
                return;
            }
            if (el.id) {
                obj[el.id] = el.value
            }
        })

        if (obj.password.length < 6) {
            return showAlert('danger', "Password is to short ")

        }

        if (obj.password.length > 16) {
            return showAlert('danger', "Password is to long ")

        }
        if (obj.password != obj.confirmPassword) {
            return showAlert('danger', "please check password and cnfPassword!")
        }


        const form = new FormData()
        for (const key in obj) {
            const value = obj[key];
            console.log(`Key: ${key}, Value: ${value}`, value);
            form.append(key, obj[key])
        }

        // console.log(email, password, cnfPassword, mobile);
        // if (!name || !email || !mobile || !password || !cnfPassword) {
        //     return alertt('danger', 'please provide all the details')
        // }
        signup(form);
    })




}
























