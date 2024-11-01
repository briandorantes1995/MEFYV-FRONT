import axios from "axios";

async function buscarClientePorId(id) {
    const baseURL = `${process.env.REACT_APP_BACKEND_URL}cliente/cliente/${id}`;

    try {
        const response = await axios.get(baseURL);
        return response.data; // Retorna los datos del cliente

    } catch (error) {
        console.error('Error al buscar cliente por ID:', error);
        throw error; // Lanza el error para manejarlo donde se llame a esta función
    }
}

export default buscarClientePorId;
