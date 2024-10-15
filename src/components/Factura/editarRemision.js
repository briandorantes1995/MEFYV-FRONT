import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Field, FieldArray, Formik } from 'formik';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { facturaSchema } from '../Validation/Schema';
import CustomInput from '../Validation/customInput';
import obtenerArticulos from '../../funciones/obtenerArticulos';
import buscarRemisiones from '../../funciones/buscarRemisiones';
import actualizarRemision from "../../funciones/actualizarRemision";

function EditarRemision() {
    const [articulos, setArticulos] = useState([]);
    const [remisionInicial, setRemisionInicial] = useState(null);
    const { remisionId } = useParams();
    const navigate = useNavigate();

    // Función para enviar el formulario de actualización
    const onSubmit = async (values, actions) => {
        try {
            const result = await actualizarRemision(remisionId, values);
            if (result) {
                console.log("Actualización exitosa:", result);
                navigate(`/remision/${remisionId}`); // Redirigir solo después de la actualización exitosa
            } else {
                console.error('No se pudo actualizar la remisión.');
            }
            actions.resetForm();
        } catch (error) {
            console.error('Error durante la actualización de la remisión:', error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                // Obtener la lista de artículos disponibles
                const responseDataArticulos = await obtenerArticulos();
                if (responseDataArticulos && Array.isArray(responseDataArticulos.articulos)) {
                    setArticulos(responseDataArticulos.articulos);
                } else {
                    console.error('La respuesta no contiene un array de artículos:', responseDataArticulos);
                }

                // Obtener la remisión usando `buscarRemisiones`
                const responseDataRemision = await buscarRemisiones(remisionId);
                if (responseDataRemision && responseDataRemision.remisiones.length > 0) {
                    setRemisionInicial(responseDataRemision.remisiones[0]); // Asigna la primera remisión encontrada
                } else {
                    console.error('No se encontró la remisión con el ID:', remisionId);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        fetchData();
    }, [remisionId]);

    if (!remisionInicial) {
        return <div>Cargando remisión...</div>;
    }

    return (
        <MDBContainer className="my-5">
            <MDBCard className="bg-cv">
                <MDBCardBody className="d-flex flex-column">
                    <h3 className="fw-bold my-4 pb-3" style={{ letterSpacing: '1px' }}>
                        Editar Remisión
                    </h3>
                    <Formik
                        initialValues={{
                            nombre: remisionInicial.cliente || '',
                            domicilio: remisionInicial.domicilio || '',
                            rfc: remisionInicial.rfc || '',
                            articulos: remisionInicial.detalles || [{ articuloId: '', cantidad: 1 }] // Usamos los detalles de la remisión como artículos
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
                                    Actualizar Remisión
                                </MDBBtn>
                            </Form>
                        )}
                    </Formik>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default EditarRemision;