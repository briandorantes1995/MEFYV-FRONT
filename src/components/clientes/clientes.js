import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/base";
import ClienteCard from "../ui/clientecard";
import buscarClientePorId from "../../funciones/buscarCliente";
import borrarCliente from "../../funciones/borrarCliente";


function Clientes() {
    const [cliente, setCliente] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { clienteId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await buscarClientePorId(clienteId);
                setCliente(data || null);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cliente:', error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [clienteId]);

    const handleEditar = () => {
        navigate(`/editar-cliente/${clienteId}`);
    };

    const handleBorrar = async () => {
        try {
            await borrarCliente(clienteId); // Llamar a la función de borrado
            console.log("Remisión eliminada con éxito");
            navigate('/');
        } catch (error) {
            console.error("Error al eliminar la remisión:", error);
        }
    };

    return (
        <div className="container-fluid v">
            {isLoading ? (
                <LinearProgress />
            ) : (
                <div className="container-fluid v">
                    {cliente ? (
                        <>
                            <ClienteCard key={cliente.id} cliente={cliente} />
                            <>
                                <Button variant="contained" size="large" className='btn-v' onClick={handleEditar}>Editar</Button>
                                <Button variant="contained" size="large" className='btn-v' onClick={handleBorrar}>Borrar</Button>
                            </>
                        </>
                    ) : (
                        <p>No se encontró el cliente con el ID: {clienteId}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Clientes;

