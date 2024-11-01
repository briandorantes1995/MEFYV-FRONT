import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

function Reportes() {
    const [busquedaRemision, setBusquedaRemision] = useState('');
    const [busquedaCliente, setBusquedaCliente] = useState(''); // Estado para la búsqueda de clientes
    const navigate = useNavigate();

    useEffect(() => {
    }, [navigate]);

    const handleInputChangeRemision = (event) => {
        setBusquedaRemision(event.target.value);
    };

    const handleBuscarRemisionClick = () => {
        navigate(`/busqueda/${busquedaRemision}`);
    };

    const handleInputChangeCliente = (event) => {
        setBusquedaCliente(event.target.value);
    };

    const handleBuscarClienteClick = () => {
        navigate(`/busquedacliente/${busquedaCliente}`);
    };

    return (
        <MDBContainer className="my-5">
            <MDBCard className="bg-cv">
                <MDBCardBody className="d-flex flex-column">
                    <h3 className="fw-bold my-4 pb-3" style={{ letterSpacing: '1px' }}>
                        Reportes
                    </h3>

                    {/* Formulario de búsqueda de remisiones */}
                    <form className='d-flex input-group w-auto mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Buscar Remisión'
                            aria-label='Buscar'
                            onChange={handleInputChangeRemision}
                        />
                        <MDBBtn color='primary' onClick={handleBuscarRemisionClick}>Buscar Remisión</MDBBtn>
                    </form>

                    {/* Formulario de búsqueda de clientes */}
                    <form className='d-flex input-group w-auto'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Buscar Cliente'
                            aria-label='Buscar Cliente'
                            onChange={handleInputChangeCliente}
                        />
                        <MDBBtn color='primary' onClick={handleBuscarClienteClick}>Buscar Cliente</MDBBtn>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Reportes;
