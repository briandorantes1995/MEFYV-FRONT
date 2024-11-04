import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import "./remisiones.css";
import { Link, useParams } from "react-router-dom";
import buscarRemisiones from "../../funciones/buscarRemisiones";
import BasicCard from "../ui/card";
import { format, parseISO } from "date-fns";

function BusquedaRemisiones() {
    const [remisiones, setRemisiones] = useState([]);
    const [filteredRemisiones, setFilteredRemisiones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { busqueda } = useParams();

    // Estados para los filtros
    const [fechas, setFechas] = useState([]);
    const [selectedFecha, setSelectedFecha] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await buscarRemisiones(busqueda);
                setRemisiones(data.remisiones || []);
                setIsLoading(false);

                // Obtener fechas únicas de las remisiones
                const fechasUnicas = Array.from(new Set(data.remisiones.map(remision => format(parseISO(remision.fecha), 'dd/MM/yyyy'))));
                setFechas(fechasUnicas);

                // Filtrar la lista inicial
                setFilteredRemisiones(data.remisiones || []);
            } catch (error) {
                console.error('Error fetching remisiones:', error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [busqueda]);

    // Filtrar las remisiones cuando se selecciona una fecha
    useEffect(() => {
        let filtered = remisiones;

        if (selectedFecha) {
            filtered = filtered.filter(remision => format(parseISO(remision.fecha), 'dd/MM/yyyy') === selectedFecha);
        }

        setFilteredRemisiones(filtered);
    }, [selectedFecha, remisiones]);

    return (
        <div className="container-fluid v">
            {isLoading ? (
                <LinearProgress />
            ) : (
                <div className="container-fluid v">
                    <h5 className="titFil">FILTROS</h5>
                    <div className="filtro">
                        <label>Fecha de Remisión</label>
                        <select onChange={(e) => setSelectedFecha(e.target.value)}>
                            <option value="">Todas</option>
                            {fechas.map((fecha, index) => (
                                <option key={index} value={fecha}>
                                    {fecha}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="error">
                        {filteredRemisiones.length === 0 ? (
                            <p>No se encontraron remisiones que coincidan con los filtros seleccionados.</p>
                        ) : (
                            <>
                                <p>Resultado: {busqueda}</p>
                                <div>
                                    {filteredRemisiones.map((remision, index) => (
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




