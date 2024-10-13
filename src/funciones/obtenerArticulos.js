import axios from "axios";


async function obtenerArticulos(){
    const baseURL = process.env.REACT_APP_BACKEND_URL+`articulo/articulos`;
    try{
        const response = await axios.get(baseURL, {
        });
        return response.data;

    }catch(error){
        console.log('No se obtuvieron los articulos :', error);
    }

}

export default obtenerArticulos;