import axios from "axios";
let baseURL =process.env.REACT_APP_BACKEND_URL;
async function loginEmail(email, password,seleccion) {
        baseURL = baseURL+"usuarios/login"
    try {
        const response = await axios.post(baseURL, {
            email: email,
            password: password
        });
        if(response){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export default loginEmail;