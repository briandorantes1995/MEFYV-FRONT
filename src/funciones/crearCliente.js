import axios from "axios";

async function crearCliente(nombre, domicilio, rfc, telefono, email) {
    const baseURL = `${process.env.REACT_APP_BACKEND_URL}cliente/crear`; // URL para el endpoint de clientes
    try {
        const response = await axios.post(baseURL, {
            nombre,
            domicilio,
            rfc,
            telefono,
            email
        });
        return response.data; // Retorna la respuesta del servidor
    } catch (error) {
        console.log('Error al crear el cliente:', error);
        throw error; // Lanza el error para que pueda ser manejado
    }
}

export default crearCliente;
