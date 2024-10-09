import axios from "axios";


async function crearFactura(nombre,domicilio,rfc){
    const baseURL = process.env.REACT_APP_BACKEND_URL+`facturas/crearFactura`;
    try {
        const response = await axios.post(baseURL, {
            nombre: nombre,
            domicilio: domicilio,
            rfc:rfc,
        });
        if(response){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }

}

export default crearFactura;