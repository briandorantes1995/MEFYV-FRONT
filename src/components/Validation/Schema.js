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

    // Campos de dirección específicos
    estado: Yup.string().required('El estado es obligatorio'),
    municipio: Yup.string().required('El municipio es obligatorio'),
    colonia: Yup.string().required('La colonia es obligatoria'),
    codigoPostal: Yup.string()
        .required('El código postal es obligatorio')
        .matches(/^\d{5}$/, 'Código postal no válido'),
    calle: Yup.string().required('La calle es obligatoria'),

    rfc: Yup.string()
        .required('El RFC es obligatorio')
        .matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, 'RFC no válido'),

    telefono: Yup.string()
        .matches(/^\d{10}$/, 'Teléfono no válido')
        .required('El teléfono es obligatorio'),

    email: Yup.string()
        .email('Email no válido')
        .required('El email es obligatorio')
});