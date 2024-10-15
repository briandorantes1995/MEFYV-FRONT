import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import "./remisiones.css";
import {Link, useParams} from "react-router-dom";
import buscarRemisiones from "../../funciones/buscarRemisiones";
import BasicCard from "../ui/card";

function BusquedaRemisiones() {
    const [remisiones, setRemisiones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { busqueda } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await buscarRemisiones(busqueda);
                setRemisiones(data.remisiones || []);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching remisiones:', error);
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
                        {remisiones.length === 0 ? (
                            <p>No se encontraron remisiones que coincidan con la búsqueda: {busqueda}</p>
                        ) : (
                            <>
                                <p>Resultado: {busqueda}</p>
                                <div>
                                    {remisiones.map((remision,index) => (
                                        <Link to={`/remision/${remision.identificador}`} target="_self" key={index}>
                                        <BasicCard key={remision.id} remision={remision} detalle={1} />
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

export default BusquedaRemisiones;



