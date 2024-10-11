import axios from "axios";
let baseURL =process.env.REACT_APP_BACKEND_URL+"usuario/registro";
async function registroUsuario(name, email, password) {
    try {
        const response = await axios.post(baseURL, {
            nombre: name,
            correo: email,
            contrasena: password
        });
        return response.data;  // On success, return the response
    } catch (error) {
        console.error('Error en el registro:', error);
        throw error;  // Throw the error so that it can be caught in onSubmit
    }
}


export default registroUsuario;