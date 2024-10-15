import axios from "axios";

async function borrarRemision(identificador) {
    const baseURL = `${process.env.REACT_APP_BACKEND_URL}remision/borrar-remision/${identificador}`;
    try {
        const response = await axios.delete(baseURL, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error al borrar la remisión:', error);
        throw error;
    }
}

export default borrarRemision;
