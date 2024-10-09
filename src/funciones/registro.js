import axios from "axios";
let baseURL =process.env.REACT_APP_BACKEND_URL;
async function registro(name, email, password,seleccion) {
        baseURL = baseURL+"usuarios/registro"
    try {
        console.log(baseURL);
        const response = await axios.post(baseURL, {
            nombre: name,
            correo: email,
            contra: password
        });
        return response.data;
    } catch (error) {
        console.log('Error en el registro:', error);
    }
}

export default registro;