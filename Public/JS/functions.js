
import axios from "axios";
import { showAlert } from "./alerts";


export const login = async (email, password) => {
    // console.log(email, password);
    try {
        // const res = await axios({
        //     method: 'POST',
        //     url: 'http://127.0.0.1:3000/api/v1/user/login',
        //     data: {
        //         email,
        //         password
        //     }
        // });
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





export const signup = async (name, email, password, mobile, cnfPassword) => {
    // console.log(email, password);
    try {
        // const res = await axios({
        //     method: 'POST',
        //     url: 'http://127.0.0.1:3000/api/v1/user/login',
        //     data: {
        //         email,
        //         password
        //     }
        // });

        if (password != cnfPassword) {
            return showAlert('danger', "please check password and cnfPassword!")
        }

        const res = await axios.post('http://127.0.0.1:3001/api/v1/user/signup', { name, email, password, mobile })
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