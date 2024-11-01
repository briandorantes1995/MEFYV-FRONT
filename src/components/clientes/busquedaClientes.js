import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Link, useParams } from "react-router-dom";
import buscarClientes from "../../funciones/buscarClientes";
import ClienteCard from "../ui/clientecard";

function BusquedaClientes() {
    const [clientes, setClientes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { busqueda } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await buscarClientes(busqueda);
                setClientes(data || []); // Asegúrate de que data tenga la forma correcta
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching clientes:', error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [busqueda]);

    return (
        <div className="container-fluid v">
            {isLoading ? (
                <LinearProgress />
            ) : (
                <div className="container-fluid v">
                    <div className='error'>
                        {clientes.length === 0 ? (
                            <p>No se encontraron clientes que coincidan con la búsqueda: {busqueda}</p>
                        ) : (
                            <>
                                <p>Resultados para: {busqueda}</p>
                                <div>
                                    {clientes.map((cliente) => (
                                        <Link to={`/cliente/${cliente.id}`} target="_self" key={cliente.id}>
                                            <ClienteCard cliente={cliente} detalle={1} />
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BusquedaClientes;

