import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import CustomInput from '../Validation/customInput';
import crearCliente from '../../funciones/crearCliente';
import { clienteSchema } from '../Validation/Schema';
import CustomizedSnackbars from "../ui/snackBar";

function CrearCliente() {
    const navigate = useNavigate();
    const [cuentaMessage, setCuentaMessage] = useState();

    const onSubmit = async (values, actions) => {
        try {
            const domicilioConcatenado = `${values.estado}, ${values.municipio}, ${values.colonia}, ${values.codigoPostal}, ${values.calle}`;

            // Llamada a la función `crearCliente`
            const cliente = await crearCliente(
                values.nombre,
                domicilioConcatenado,
                values.rfc,
                `${values.lada} ${values.telefono}`,
                values.email
            );

            // Muestra el mensaje y navega en caso de éxito
            if (cliente) {
                console.log(cliente);
                setCuentaMessage(cliente.message);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
            actions.resetForm();
        } catch (error) {
            console.error('Error durante la creación del cliente:', error);
            // Muestra el mensaje de error en la interfaz
            setCuentaMessage(error.message || 'Error desconocido al crear cliente');
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="fill-window">
            <CustomizedSnackbars message={cuentaMessage} level={"success"} vertical={'bottom'} horizontal={'center'} />
        <MDBContainer className="my-5">
            <MDBCard className="bg-cv">
                <MDBCardBody className="d-flex flex-column">
                    <h3 className="fw-bold my-4 pb-3" style={{ letterSpacing: '1px' }}>
                        Crear nuevo Cliente
                    </h3>
                    <Formik
                        initialValues={{
                            nombre: '',
                            estado: '',
                            municipio: '',
                            colonia: '',
                            codigoPostal: '',
                            calle: '',
                            rfc: '',
                            lada: '',        // Campo de Lada
                            telefono: '',    // Campo de Teléfono
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
                                    label="Estado"
                                    name="estado"
                                    type="input"
                                    placeholder="Estado"
                                />
                                <CustomInput
                                    label="Municipio"
                                    name="municipio"
                                    type="input"
                                    placeholder="Municipio"
                                />
                                <CustomInput
                                    label="Colonia"
                                    name="colonia"
                                    type="input"
                                    placeholder="Colonia"
                                />
                                <CustomInput
                                    label="Código Postal"
                                    name="codigoPostal"
                                    type="input"
                                    placeholder="Código Postal"
                                />
                                <CustomInput
                                    label="Calle"
                                    name="calle"
                                    type="input"
                                    placeholder="Calle"
                                />
                                <CustomInput
                                    label="RFC"
                                    name="rfc"
                                    type="input"
                                    placeholder="RFC del Cliente"
                                />

                                {/* Fila con Lada y Teléfono */}
                                <MDBRow>
                                    <MDBCol md="6">
                                        <CustomInput
                                            label="Lada"
                                            name="lada"
                                            type="input"
                                            placeholder="Lada"
                                        />
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <CustomInput
                                            label="Teléfono"
                                            name="telefono"
                                            type="input"
                                            placeholder="Teléfono del Cliente"
                                        />
                                    </MDBCol>
                                </MDBRow>

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
        </div>
    );
}

export default CrearCliente;



