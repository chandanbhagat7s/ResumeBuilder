
import axios from "axios";
import { showAlert } from "./alerts";


export const login = async (email, password) => {
    try {

        const res = await axios.post('http://127.0.0.1:3001/api/v1/user/login', { email, password })
        console.log(res);
        if (res.data.status) {

            showAlert(res.data.status, "you are succesfully logged in !")
            window.setTimeout(() => {
                location.assign('/');
            }, 1500)
        }


    } catch (err) {
        console.log(err);
        showAlert('danger', err.response.data.msg)
    }
};


export const logoutUser = async (data) => {

    try {
        console.log("came");

        const res = await axios.get('http://127.0.0.1:3001/api/v1/user/logout')
        console.log(res);
        if (res.data.status) {
            showAlert('success', "logout Successfull !")
            window.setTimeout(() => {
                location.assign('/');
            }, 400)
        }


    } catch (err) {
        console.log(err);
        showAlert('danger', err.response.data.msg)
    }
};
export const addDetails = async (data) => {

    try {
        console.log("came");

        const res = await axios.post('http://127.0.0.1:3001/api/v1/user/addDetails', { ...data })
        console.log(res);
        if (res.data.status) {
            showAlert('success', "Data is Saved  !")
            window.setTimeout(() => {
                location.assign('/');
            }, 1500)
        }


    } catch (err) {
        console.log(err);
        showAlert('danger', err.response.data.msg)
    }
};





export const ExtraInformationResumeVariable = async (data) => {

    try {




        const res = await axios.post('http://127.0.0.1:3001/api/v1/resume/', { ...data })
        console.log(res);
        if (res.data.status) {
            showAlert("success", "Data is Saved ,Creating your resume ")
            window.setTimeout(() => {
                // location.assign('/');
            }, 1500)
        }


    } catch (err) {
        console.log(err);
        showAlert('warning', err.response.data.msg)
    }
};
export const signup = async (name, email, password, mobile, cnfPassword) => {
    try {


        if (password != cnfPassword) {
            return showAlert('danger', "please check password and cnfPassword!")
        }

        const res = await axios.post('http://127.0.0.1:3001/api/v1/user/signup', { userName: name, email, password, mobile })
        console.log(res);
        if (res.data.status) {
            showAlert("success", "you are succesfully logged in !")
            window.setTimeout(() => {
                location.assign('/');
            }, 1500)
        }


    } catch (err) {
        console.log(err);
        showAlert('danger', err.response.data.msg)
    }
};




export const makeTemplate = async (tmplateName, data) => {
    try {

        const res = await axios.post('http://127.0.0.1:3001/api/v1/resume/', {
            ...data
        })
        console.log("res is ", res);
        if (res.response.data) {
            showAlert("success", "resume is created")
            window.setTimeout(() => {
                // location.assign('/');
            }, 1500)
        }


    } catch (err) {
        console.log("err is ", err);

        if (err.response.data.msg.includes(' complete the details page first')) {
            location.assign('/completeDetails');

        }
        // showAlert('danger', err.response.data.msg)
    }

    if (res.response) {
        showAlert("success", "resume is created")
        window.setTimeout(() => {
            // location.assign('/');
        }, 1500)
    }
};



