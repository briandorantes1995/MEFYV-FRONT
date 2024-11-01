import React from "react";
import {Route, Routes} from "react-router-dom";
import {MenuLayout, RequireAuth} from "./components/structure"
import Home from "./components/Home/Home";
import Factura from "./components/Factura/CrearFactura";
import Login from "./components/login/login";
import Registro from "./components/registro/registro";
import Reportes from "./components/Factura/Reportes";
import BusquedaRemisiones from "./components/Factura/busquedaRemisiones";
import Remision from "./components/Factura/Remision";
import EditarRemision from "./components/Factura/editarRemision";
import CrearCliente from "./components/registro/cliente";
import BusquedaClientes from "./components/clientes/busquedaClientes";
import Clientes from "./components/clientes/clientes";
import EditarCliente from "./components/clientes/editarCliente";
import "./App.css"
function App() {

  return (
      <Routes >
          <Route element={<RequireAuth><MenuLayout/></RequireAuth>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/crearRemisiones" element={<Factura/>}/>
            <Route path="/crearCliente" element={<CrearCliente/>}/>
          <Route path="/reportes" element={<Reportes/>}/>
            <Route path="/remision/:remisionId" element={<Remision/>}/>
            <Route path="/editar-remision/:remisionId" element={<EditarRemision/>}/>
            <Route path="/busqueda/:busqueda" element={<BusquedaRemisiones/>}/>
              <Route path="/cliente/:clienteId" element={<Clientes/>}/>
              <Route path="/busquedacliente/:busqueda" element={<BusquedaClientes/>}/>
              <Route path="/editar-cliente/:clienteId" element={<EditarCliente/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Registro/>}/>
      </Routes>
  );
}

export default App;
