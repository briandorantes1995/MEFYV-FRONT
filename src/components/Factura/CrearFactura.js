import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import  {facturaSchema}  from '../Validation/Schema';
import CustomInput from '../Validation/customInput'
import crearFactura from '../../funciones/crearFactura';

function CrearFactura() {
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        try {
            const factura = await crearFactura(
                values.nombre,
                values.domicilio,
                values.rfc,
            );
            if (factura) {
                navigate('/');
            }
            actions.resetForm();
        } catch (error) {
            actions.resetForm();
            console.error('Error during form submission:', error);
        }
    };

    return (
        <MDBContainer className="my-5">
            <MDBCard className="bg-cv">
                <MDBCardBody className="d-flex flex-column">
                    <h3 className="fw-bold my-4 pb-3" style={{ letterSpacing: '1px' }}>
                        Crear nueva Remision
                    </h3>
                    <Formik
                        initialValues={{ nombre:"", domicilio:"", rfc:""}}
                        validationSchema={facturaSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <CustomInput
                                    label="Nombre"
                                    name="nombre"
                                    type="input"
                                    placeholder="Nombre de la Empresa/Persona"
                                />
                                  <CustomInput
                                    label="Domicilio"
                                    name="domicilio"
                                    type="input"
                                    placeholder="Domicilio de la Empresa/Persona"
                                />
                                  <CustomInput
                                    label="RFC"
                                    name="rfc"
                                    type="input"
                                    placeholder="RFC de la Empresa/Persona"
                                />
                                <MDBBtn className="mb-4 px-5" color="dark" size="lg" disabled={isSubmitting} type="submit">Crear Remision</MDBBtn>
                            </Form>
                        )}
                    </Formik>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default CrearFactura;