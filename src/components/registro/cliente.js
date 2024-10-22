import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Formik} from 'formik';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import CustomInput from '../Validation/customInput';
import crearCliente from '../../funciones/crearCliente';
import { clienteSchema } from '../Validation/Schema';

function CrearCliente() {
    const navigate = useNavigate();

    // Función para enviar el formulario
    const onSubmit = async (values, actions) => {
        try {
            const cliente = await crearCliente(values.nombre, values.domicilio, values.rfc, values.telefono, values.email);
            if (cliente) {
                console.log("Cliente creado con éxito");
                navigate('/');
            }
            actions.resetForm();
        } catch (error) {
            actions.resetForm();
            console.error('Error durante la creación del cliente:', error);
        }
    };

    return (
        <MDBContainer className="my-5">
            <MDBCard className="bg-cv">
                <MDBCardBody className="d-flex flex-column">
                    <h3 className="fw-bold my-4 pb-3" style={{ letterSpacing: '1px' }}>
                        Crear nuevo Cliente
                    </h3>
                    <Formik
                        initialValues={{
                            nombre: '',
                            domicilio: '',
                            rfc: '',
                            telefono: '',
                            email: ''
                        }}
                        validationSchema={clienteSchema} // Validación del formulario
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <CustomInput
                                    label="Nombre"
                                    name="nombre"
                                    type="input"
                                    placeholder="Nombre del Cliente"
                                />
                                <CustomInput
                                    label="Domicilio"
                                    name="domicilio"
                                    type="input"
                                    placeholder="Domicilio del Cliente"
                                />
                                <CustomInput
                                    label="RFC"
                                    name="rfc"
                                    type="input"
                                    placeholder="RFC del Cliente"
                                />
                                <CustomInput
                                    label="Teléfono"
                                    name="telefono"
                                    type="input"
                                    placeholder="Teléfono del Cliente"
                                />
                                <CustomInput
                                    label="Email"
                                    name="email"
                                    type="input"
                                    placeholder="Email del Cliente"
                                />

                                <MDBBtn
                                    className="mt-4"
                                    color="dark"
                                    size="lg"
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    Crear Cliente
                                </MDBBtn>
                            </Form>
                        )}
                    </Formik>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default CrearCliente;

