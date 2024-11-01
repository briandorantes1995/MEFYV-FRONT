import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import registroUsuario from "../../funciones/registro";
import { registroSchema } from '../Validation/Schema';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import CustomInput from '../Validation/customInput';
import CustomizedSnackbars from "../ui/snackBar";

function Registro() {
    const navigate = useNavigate();
    const [cuentaMessage, setCuentaMessage] = useState();
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

    useEffect(() => {}, [navigate]);

    const onSubmit = async (values, actions) => {
        try {
            const cuenta = await registroUsuario(values.name, values.email, values.password);
            if (cuenta) {
                setCuentaMessage(cuenta.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000); // 3000 ms = 3 segundos
            }
            actions.resetForm();
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
            actions.setSubmitting(false);
            actions.setErrors({ server: 'Error al registrar. Por favor intente de nuevo.' });
        }
    };

    return (
        <div className="fill-window">
            <CustomizedSnackbars message={cuentaMessage} level={"success"} vertical={'bottom'} horizontal={'center'} />
            <MDBContainer className="my-5">
                <MDBCard>
                    <MDBRow className='g-0'>
                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>
                                <div className='d-flex flex-row mt-2 jc-center'>
                                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                                    <span className="h1 fw-bold mb-0">MEFYV</span>
                                </div>

                                <h5 className="fw-bolder my-4" style={{letterSpacing: '1px'}}>¡Bienvenid@!</h5>
                                <p>Ingresa tus datos para el registro</p>
                                <Formik
                                    initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                                    validationSchema={registroSchema}
                                    onSubmit={onSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <CustomInput
                                                label="Nombre"
                                                name="name"
                                                type="text"
                                                placeholder="Ingresa tu nombre"
                                            />
                                            <CustomInput
                                                label="Correo Electrónico"
                                                name="email"
                                                type="email"
                                                placeholder="Correo electrónico"
                                            />

                                            <CustomInput
                                                label="Contraseña"
                                                name="password"
                                                type={showPassword ? "text" : "password"}  // Cambia tipo basado en showPassword
                                                placeholder="Ingresa tu contraseña"
                                            />

                                            <CustomInput
                                                label="Confirma Contraseña"
                                                name="confirmPassword"
                                                type={showPassword ? "text" : "password"}  // Cambia tipo basado en showPassword
                                                placeholder="Confirma tu contraseña"
                                            />

                                            {/* Botón para mostrar/ocultar contraseña */}
                                            <div className="text-center my-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="btn btn-link"
                                                >
                                                    {showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
                                                </button>
                                            </div>

                                            <div className='text-center'>
                                                <MDBBtn className="mb-4 px-5" color='dark' size='lg' disabled={isSubmitting} type="submit">
                                                    Registrar
                                                </MDBBtn>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                    <Link style={{ color: "#000" }} to="/login">¿Ya tienes una cuenta?</Link>
                                </p>
                                <div className='d-flex flex-col justify-content-end p-3'>
                                    <a href="#" className="small text-muted me-5">Términos y condiciones</a>
                                    <a href="#" className="small text-muted">Privacidad</a>
                                </div>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}

export default Registro;
