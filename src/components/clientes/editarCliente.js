import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import CustomInput from '../Validation/customInput';
import buscarClientePorId from '../../funciones/buscarCliente';
import editarCliente from '../../funciones/editarCliente';
import { clienteSchema } from '../Validation/Schema';
import CustomizedSnackbars from "../ui/snackBar";

function EditarCliente() {
    const navigate = useNavigate();
    const { clienteId } = useParams(); // Obtener ID del cliente desde la URL
    const [cliente, setCliente] = useState(null);
    const [cuentaMessage, setCuentaMessage] = useState();

    useEffect(() => {
        async function fetchCliente() {
            try {
                const data = await buscarClientePorId(clienteId);
                setCliente(data); // Asignar los datos del cliente al estado
            } catch (error) {
                console.error('Error al obtener el cliente:', error);
            }
        }

        fetchCliente();
    }, [clienteId]);

    const onSubmit = async (values, actions) => {
        try {
            const domicilioConcatenado = `${values.estado}, ${values.municipio}, ${values.colonia}, ${values.codigoPostal}, ${values.calle}`;
            const response = await editarCliente(clienteId, {
                nombre: values.nombre,
                domicilio: domicilioConcatenado,
                rfc: values.rfc,
                telefono: `${values.lada} ${values.telefono}`,
                email: values.email
            });

            // Muestra el mensaje y navega en caso de éxito
            if (response) {
                console.log(response);
                setCuentaMessage(response.message);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
            actions.resetForm();
        } catch (error) {
            console.error('Error durante la edición del cliente:', error);
            setCuentaMessage(error.message || 'Error desconocido al editar cliente');
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
                            Editar Cliente
                        </h3>
                        {cliente && ( // Mostrar el formulario solo si el cliente se ha cargado
                            <Formik
                                initialValues={{
                                    nombre: cliente.nombre || '',
                                    estado: cliente.domicilio.split(', ')[0] || '',
                                    municipio: cliente.domicilio.split(', ')[1] || '',
                                    colonia: cliente.domicilio.split(', ')[2] || '',
                                    codigoPostal: cliente.codigoPostal || '',
                                    calle: cliente.domicilio.split(', ')[3] || '',
                                    rfc: cliente.rfc || '',
                                    lada: cliente.telefono.split(' ')[0] || '', // Suponiendo que el teléfono tiene el formato "lada telefono"
                                    telefono: cliente.telefono.split(' ')[1] || '',
                                    email: cliente.email || ''
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
                                            Guardar Cambios
                                        </MDBBtn>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}

export default EditarCliente;
