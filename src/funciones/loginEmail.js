import axios from "axios";
let baseURL =process.env.REACT_APP_BACKEND_URL;
async function loginEmail(email, password) {
        baseURL = baseURL+"usuario/login"
    try {
        const response = await axios.post(baseURL, {
            correo: email,
            contrasena: password
        });
        if(response){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export default loginEmail;