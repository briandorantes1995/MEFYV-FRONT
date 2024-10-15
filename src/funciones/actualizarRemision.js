import axios from "axios";

async function actualizarRemision(remisionId, valoresActualizados) {
    const baseURL = `${process.env.REACT_APP_BACKEND_URL}remision/actualizar-remision/${remisionId}`; // Asegúrate de que la URL sea correcta
    try {
        const response = await axios.put(baseURL, valoresActualizados, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Retorna la respuesta del servidor
    } catch (error) {
        console.log('Error al actualizar la remisión:', error);
        throw error; // Lanza el error para que pueda ser manejado en el onSubmit
    }
}

export default actualizarRemision;

