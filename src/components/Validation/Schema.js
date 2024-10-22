import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 caracteres, 1 letra mayuscula, 1 letra minuscula, 1 numero

export const registroSchema =Yup.object().shape({
    name: Yup.string().min(2, 'Demasiado Corto!').max(50, 'Demasiado Largo!').required('Obligatorio'),
    email: Yup.string().email('Correo Invalido').required('Obligatorio'),
    password:Yup.string().min(5,'Minimo 5 caracteres, 1 letra mayuscula, 1 letra minuscula, 1 numero').matches(passwordRules,{ message: "Crea una Contraseña mas segura"}).required('Obligatorio'),
    confirmPassword: Yup.string().oneOf([Yup.ref ("password"), null],"Debe coincidir la contraseña").required('Obligatorio'),
});

export const loginSchema =Yup.object().shape({
    email: Yup.string().email('Correo Invalido').required('Obligatorio'),
    password:Yup.string().required('Obligatorio'),
});


export const facturaSchema =Yup.object().shape({
    nombre:Yup.string().required('Obligatorio'),
    domicilio:Yup.string().required('Obligatorio'),
    rfc: Yup.string().required("Obligatorio"),
});

export const clienteSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    domicilio: Yup.string().required('El domicilio es obligatorio'),
    rfc: Yup.string()
        .required('El RFC es obligatorio')
        .matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, 'RFC no válido'),
    telefono: Yup.string().matches(/^\d{10}$/, 'Teléfono no válido'),
    email: Yup.string().email('Email no válido'),
});