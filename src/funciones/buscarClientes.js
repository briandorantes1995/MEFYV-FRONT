import axios from "axios";

async function buscarClientes(q) {
    const baseURL = `${process.env.REACT_APP_BACKEND_URL}cliente/buscar`;
    try {
        const response = await axios.get(baseURL, {
            params: {
                q
            }
        });
        return response.data;

    } catch (error) {
        console.log('Error al buscar clientes:', error);
        return null; // Devuelve null si hay un error
    }
}

export default buscarClientes;
