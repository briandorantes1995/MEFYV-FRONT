import axios from "axios";

async function buscarRemisiones(identificador) {
    const baseURL = `${process.env.REACT_APP_BACKEND_URL}remision/buscar`;
    try {
        const response = await axios.get(baseURL, {
            params: {
                identificador
            }
        });
        return response.data;

    } catch (error) {
        console.log('Error al buscar remisiones:', error);
        return null;
    }
}

export default buscarRemisiones;


