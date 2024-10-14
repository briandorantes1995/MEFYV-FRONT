import axios from "axios";

async function crearRemision(nombre, domicilio, rfc, articulos, observaciones = '') {
    const baseURL = process.env.REACT_APP_BACKEND_URL + `remision/crear-remision`;

    try {
        // Enviar la solicitud POST con los datos de la remisión y los artículos
        const response = await axios.post(baseURL, {
            cliente: nombre,
            domicilio: domicilio,
            rfc: rfc,
            articulos: articulos,  // Array de objetos { articuloId, cantidad }
            observaciones: observaciones  // Opcional, puedes enviar observaciones
        });

        if (response) {
            return response.data;  // Retorna la respuesta en caso de éxito
        }
    } catch (error) {
        console.log("Error al crear la remisión:", error);
    }
}

export default crearRemision;
