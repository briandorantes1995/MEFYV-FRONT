import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavbarData } from "./NavbarData";
import { destroy } from "../../features/userSlice"; // Importar la acción para cerrar sesión
import "../../App.css";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const user = useSelector((state) => state.user.value); // Obtener el usuario del estado global
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showSidebar = () => setSidebar(!sidebar);

    // Función para cerrar sesión
    const cerrarSesion = () => {
        dispatch(destroy()); // Limpiar el estado de usuario
        navigate("/login");
    };

    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars" onClick={showSidebar}>
                    ☰
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            x
                        </Link>
                    </li>

                    {/* Mostrar el nombre del usuario si está logueado */}
                    {user && (
                        <Link to="#">
                            <span>Bienvenido, {user.userName}!</span>
                        </Link>
                    )}

                    {/* Mapear opciones del Navbar, excluyendo "Login/Registro" si el usuario está autenticado */}
                    {NavbarData.map((item, index) => {
                        // Si el usuario está logueado, no mostrar "Login/Registro"
                        if (item.title === "Login/Registro" && user) {
                            return null; // No mostrar esta opción
                        }
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}

                    {/* Si el usuario está autenticado, mostrar la opción de Altas Clientes y Cerrar Sesión */}
                    {user && (
                        <>
                            <li className="nav-text">
                                <Link to="/crearCliente">  {/* Aquí redirigimos directamente al formulario de clientes */}
                                    <span>Altas Clientes</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="#" onClick={cerrarSesion}>
                                    <span>Cerrar Sesión</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;




