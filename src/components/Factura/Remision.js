import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import "./remisiones.css";
import {useNavigate, useParams} from "react-router-dom";
import buscarRemisiones from "../../funciones/buscarRemisiones";
import BasicCard from "../ui/card";
import { Button } from "@mui/base";
import generarPDF from "./ImprimirFactura";
import borrarRemision from "../../funciones/borrarRemision";

function Remision() {
    const [remision, setRemision] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { remisionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await buscarRemisiones(remisionId);
                console.log(data)
                setRemision(data.remisiones?.[0] || null);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching remision:', error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [remisionId]);

    const imprimir = () => {
        if (remision) {
            generarPDF(remision);
        } else {
            console.log("No hay remisión disponible para imprimir");
        }
    };

    const editar = () => {
        navigate(`/editar-remision/${remisionId}`);
    };

    const handleBorrar = async () => {
        try {
            await borrarRemision(remisionId); // Llamar a la función de borrado
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
                    {remision ? (
                        <>
                            <BasicCard key={remision.id} remision={remision} detalle={1} />
                            <>
                                <Button variant="contained" size="large" className='btn-v' onClick={imprimir}>Imprimir</Button>
                                <Button variant="contained" size="large" className='btn-v' onClick={editar}>Editar</Button>
                                <Button variant="contained" size="large" className='btn-v' onClick={handleBorrar}>Borrar</Button>
                            </>
                        </>
                    ) : (
                        <p>No se encontró la remisión con el ID: {remisionId}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Remision;

