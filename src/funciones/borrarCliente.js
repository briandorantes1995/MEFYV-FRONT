import axios from 'axios';

async function borrarCliente(id) {
    const baseURL = `${process.env.REACT_APP_BACKEND_URL}cliente/borrar/${id}`;

    try {
        const response = await axios.delete(baseURL);
        return response.data;
    } catch (error) {
        console.error('Error al borrar el cliente:', error);
        throw error; // Lanza el error para que pueda ser manejado en el componente
    }
}

export default borrarCliente;
