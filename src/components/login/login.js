import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import {Form, Formik} from 'formik';
import {MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon} from 'mdb-react-ui-kit';
import {loginSchema} from '../Validation/Schema';
import CustomInput from '../Validation/customInput';
import {set} from "../../features/userSlice";
import loginEmail from '../../funciones/loginEmail';
import './login.css'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
    }, [navigate]);
    const onSubmit = async (values, actions) => {
        try{
            const cuenta = await loginEmail(values.email, values.password);
            if(cuenta.token){
                dispatch(set(cuenta.token))
                navigate('/');
            }
            actions.resetForm();
        }catch(error){
            actions.resetForm();
            console.log(error);
        }
    }

    return (
        <div className="fill-window">
        <MDBContainer className="my-5">
            <MDBCard>
                <MDBRow className='g-0'>

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>

                            <div className='d-flex flex-row mt-3 jc-center'>
                                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                                <span className="h1 fw-bold">MEFYV</span>
                            </div>

                            <h5 className="fw-bolder my-4 t" style={{letterSpacing: '1px'}}>¡Bienvenid@ nuevamente!</h5>
                            <p>Ingresa tu correo y tu contraseña para iniciar sesión</p>

                            <Formik
                                initialValues={{email:"",password: ""}}
                                validationSchema={loginSchema}
                                onSubmit={onSubmit}>
                                {({ isSubmitting }) => (
                                    <Form>
                                        <CustomInput
                                            label="Correo Electronico"
                                            name="email"
                                            type="email"
                                            placeholder="Correo electronico">
                                        </CustomInput>
                                        <CustomInput
                                            label="Contraseña"
                                            name="password"
                                            type="password"
                                            placeholder="Ingresa tu contraseña">
                                        </CustomInput>
                                        <div className='text-center'>
                                            <MDBBtn className="mb-4 px-5" color='dark' size='lg' disabled={isSubmitting} type="submit">Iniciar Sesion</MDBBtn>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <br></br>
                            <p className="mb-5 pb-lg-2 db" style={{color: '#393f81'}}>No tienes una cuenta? <Link style={{color: "#2a70e0"}} to="/registro">Registrate Aqui</Link></p>

                            <div className='d-flex flex-row justify-content-end p-3'>
                                <a href="#" className="small text-muted me-5">Terminos y condiciones </a>
                                <a href="#" className="small text-muted">  Privacidad</a>
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