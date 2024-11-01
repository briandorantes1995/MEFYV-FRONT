import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { loginSchema } from '../Validation/Schema';
import CustomInput from '../Validation/customInput';
import { set } from "../../features/userSlice";
import loginEmail from '../../funciones/loginEmail';
import './login.css'
import CustomizedSnackbars from "../ui/snackBar";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cuentaMessage, setCuentaMessage] = useState();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {}, [navigate]);

    const onSubmit = async (values, actions) => {
        try {
            const cuenta = await loginEmail(values.email, values.password);
            if (cuenta.token) {
                dispatch(set(cuenta.token));
                setCuentaMessage(cuenta.message);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
            actions.resetForm();
        } catch (error) {
            actions.resetForm();
            console.log(error);
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
                                <div className='d-flex flex-row mt-3 jc-center'>
                                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                                    <span className="h1 fw-bold">MEFYV</span>
                                </div>

                                <h5 className="fw-bolder my-4" style={{letterSpacing: '1px'}}>¡Bienvenid@ nuevamente!</h5>
                                <p>Ingresa tu correo y tu contraseña para iniciar sesión</p>

                                <Formik
                                    initialValues={{ email: "", password: "" }}
                                    validationSchema={loginSchema}
                                    onSubmit={onSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <CustomInput
                                                label="Correo Electrónico"
                                                name="email"
                                                type="email"
                                                placeholder="Correo electrónico"
                                            />
                                            <CustomInput
                                                label="Contraseña"
                                                name="password"
                                                type={showPassword ? "text" : "password"} // Cambia el tipo basado en showPassword
                                                placeholder="Ingresa tu contraseña"
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
                                                    Iniciar Sesión
                                                </MDBBtn>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>

                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                    ¿No tienes una cuenta? <Link style={{ color: "#2a70e0" }} to="/registro">Regístrate aquí</Link>
                                </p>

                                <div className='d-flex flex-row justify-content-end p-3'>
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

export default Login;
