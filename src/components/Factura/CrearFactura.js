import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field, FieldArray, Formik } from 'formik';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { facturaSchema } from '../Validation/Schema';
import CustomInput from '../Validation/customInput';
import crearFactura from '../../funciones/crearFactura';
import obtenerArticulos from '../../funciones/obtenerArticulos';
import CustomLista from '../Validation/customLista';
import { Tooltip } from '@mui/material';

function CrearFactura() {
    const [articulos, setArticulos] = useState([]);
    const navigate = useNavigate();

    // Función para enviar el formulario
    const onSubmit = async (values, actions) => {
        try {
            const factura = await crearFactura(
                values.nombre,
                values.domicilio,
                values.rfc,
                values.articulos
            );
            if (factura) {
                navigate('/');
            }
            actions.resetForm();
        } catch (error) {
            actions.resetForm();
            console.error('Error durante la creación de la factura:', error);
        }
    };

    // Fetch de artículos disponibles
    useEffect(() => {
        async function fetchData() {
            try {
                const responseData = await obtenerArticulos();
                if (responseData && Array.isArray(responseData.articulos)) {
                    setArticulos(responseData.articulos);
                } else {
                    console.error('La respuesta no contiene un array de artículos:', responseData);
                }
            } catch (error) {
                console.error('Error al obtener los artículos:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <MDBContainer className="my-5">
            <MDBCard className="bg-cv">
                <MDBCardBody className="d-flex flex-column">
                    <h3 className="fw-bold my-4 pb-3" style={{ letterSpacing: '1px' }}>
                        Crear nueva Remisión
                    </h3>
                    <Formik
                        initialValues={{
                            nombre: '',
                            domicilio: '',
                            rfc: '',
                            articulos: [{ articuloId: '', cantidad: 1 }] // Artículos iniciales
                        }}
                        validationSchema={facturaSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, isSubmitting }) => (
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

                                {/* Sección de artículos dinámicos */}
                                <FieldArray name="articulos">
                                    {({ remove, push }) => (
                                        <div>
                                            <h5>Artículos y Cantidades</h5>
                                            {values.articulos.map((_, index) => (
                                                <div key={index} className="d-flex mb-3">
                                                    {/* Selección del artículo */}
                                                    <Field
                                                        name={`articulos[${index}].articuloId`}
                                                        as="select"
                                                        className="form-select me-2"
                                                    >
                                                        <option value="">Seleccione un artículo</option>
                                                        {articulos.map((articulo) => (
                                                            <option key={articulo.id} value={articulo.id}>
                                                                {articulo.nombre}
                                                            </option>
                                                        ))}
                                                    </Field>

                                                    {/* Campo de cantidad */}
                                                    <Field
                                                        name={`articulos[${index}].cantidad`}
                                                        type="number"
                                                        placeholder="Cantidad"
                                                        className="form-control me-2"
                                                        min="1"
                                                    />

                                                    {/* Botón para eliminar artículo */}
                                                    <MDBBtn
                                                        color="danger"
                                                        size="sm"
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                    >
                                                        Eliminar
                                                    </MDBBtn>
                                                </div>
                                            ))}

                                            {/* Botón para añadir un nuevo artículo */}
                                            <MDBBtn
                                                color="info"
                                                type="button"
                                                onClick={() => push({ articuloId: '', cantidad: 1 })}
                                            >
                                                Añadir artículo
                                            </MDBBtn>
                                        </div>
                                    )}
                                </FieldArray>

                                <MDBBtn
                                    className="mt-4"
                                    color="dark"
                                    size="lg"
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    Crear Remisión
                                </MDBBtn>
                            </Form>
                        )}
                    </Formik>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default CrearFactura;
