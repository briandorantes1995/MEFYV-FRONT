import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field, FieldArray, Formik } from 'formik';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import crearFactura from '../../funciones/crearFactura';
import obtenerArticulos from '../../funciones/obtenerArticulos';
import obtenerClientes from '../../funciones/obtenerClientes';
import CustomizedSnackbars from "../ui/snackBar"; // Nueva función para obtener clientes

function CrearFactura() {
    const [articulos, setArticulos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();
    const [cuentaMessage, setCuentaMessage] = useState();

    const onSubmit = async (values, actions) => {
        try {
            const factura = await crearFactura(
                values.clienteId, // Pasamos el clienteId
                values.articulos
            );
            if (factura) {
                setCuentaMessage(factura.message);
                setTimeout(() => {
                    navigate(`/remision/${factura.identificador}`);
                }, 3000);
            }
            actions.resetForm();
        } catch (error) {
            actions.resetForm();
            console.error('Error durante la creación de la factura:', error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                // Obtener los artículos
                const responseDataArticulos = await obtenerArticulos();
                if (responseDataArticulos && Array.isArray(responseDataArticulos.articulos)) {
                    setArticulos(responseDataArticulos.articulos);
                } else {
                    console.error('La respuesta no contiene un array de artículos:', responseDataArticulos);
                }

                // Obtener los clientes
                const responseDataClientes = await obtenerClientes(); // Obtener lista de clientes
                if (responseDataClientes && Array.isArray(responseDataClientes.clientes)) {
                    setClientes(responseDataClientes.clientes);
                } else {
                    console.error('La respuesta no contiene un array de clientes:', responseDataClientes);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="fill-window">
            <CustomizedSnackbars message={cuentaMessage} level={"success"} vertical={'bottom'} horizontal={'center'} />
        <MDBContainer className="my-5">
            <MDBCard className="bg-cv">
                <MDBCardBody className="d-flex flex-column">
                    <h3 className="fw-bold my-4 pb-3" style={{ letterSpacing: '1px' }}>
                        Crear nueva Remisión
                    </h3>
                    <Formik
                        initialValues={{
                            clienteId: '', // Cliente seleccionado
                            articulos: [{ articuloId: '', cantidad: 1 }] // Artículos iniciales
                        }}
                        onSubmit={onSubmit}
                    >
                        {({ values, isSubmitting }) => (
                            <Form>
                                {/* Selección del cliente */}
                                <div className="mb-3">
                                    <label htmlFor="clienteId" className="form-label">Cliente</label>
                                    <Field as="select" name="clienteId" className="form-select">
                                        <option value="">Seleccione un cliente</option>
                                        {clientes.map(cliente => (
                                            <option key={cliente.id} value={cliente.id}>
                                                {cliente.nombre}
                                            </option>
                                        ))}
                                    </Field>
                                </div>

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
            </div>
    );
}

export default CrearFactura;

