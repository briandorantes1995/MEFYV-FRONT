import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';


function Reportes() {
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
    }, [navigate]);

    const handleInputChange = (event) => {
        setBusqueda(event.target.value);
    };

    const handleBuscarClick = () => {
        navigate(`/busqueda/${busqueda}`)
    };

    return (
        <MDBContainer className="my-5">
            <MDBCard className="bg-cv">
                <MDBCardBody className="d-flex flex-column">
                    <h3 className="fw-bold my-4 pb-3" style={{ letterSpacing: '1px' }}>
                        Reportes
                    </h3>
                    <form className='d-flex input-group w-auto'>
                        <input type='buscar' className='form-control' placeholder='Buscar Remision' aria-label='Buscar'  onChange={handleInputChange}/>
                        <MDBBtn color='primary' onClick={handleBuscarClick}>Buscar Remision</MDBBtn>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Reportes;