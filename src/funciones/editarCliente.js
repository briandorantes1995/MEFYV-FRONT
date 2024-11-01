import axios from 'axios';

async function editarCliente(id, clienteData) {
    const baseURL = `${process.env.REACT_APP_BACKEND_URL}cliente/editar/${id}`;

    try {
        const response = await axios.put(baseURL, clienteData);
        return response.data;
    } catch (error) {
        console.error('Error al editar el cliente:', error);
        throw error;
    }
}

export default editarCliente;
